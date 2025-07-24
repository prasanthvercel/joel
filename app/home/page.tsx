

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'components/Button/Button';

const HomePage = () => {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  const [interimTranscript, setInterimTranscript] = useState('');
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);

  const sendToGemini = async (text: string) => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error sending request to Gemini API');
      }

      const data = await response.json();
      console.log('Gemini API response:', data);

      setConversation(prev => [...prev, `AI: ${data.text}`]);

    } catch (error) {
      console.error('Error interacting with Gemini API route:', error);
      setConversation(prev => [...prev, `AI: Error - ${error.message}`]);
    }
  };


  const startListening = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.error('Speech Recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognitionRef.current = new SpeechRecognition();

    speechRecognitionRef.current.continuous = true;
    speechRecognitionRef.current.interimResults = true;

    speechRecognitionRef.current.onstart = () => {
      setIsListening(true);
      console.log('Speech recognition started');
    };

    speechRecognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      let currentInterimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          currentInterimTranscript += transcript;
        }
      }

      setInterimTranscript(currentInterimTranscript);

      if (finalTranscript) {
          setConversation(prev => [...prev, `User: ${finalTranscript}`]);
          sendToGemini(finalTranscript);
          setInterimTranscript('');
      }
    };

    speechRecognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setConversation(prev => [...prev, `System: Speech recognition error - ${event.error}`]);
    };

    speechRecognitionRef.current.onend = () => {
      setIsListening(false);
      console.log('Speech recognition ended');
      if (!isListening) {
         startListening();
         console.log('Restarting speech recognition');
      }
    };

    speechRecognitionRef.current.start();
  };

  const stopListening = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      console.log('Speech recognition stopping...');
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    startListening();

    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, []);


  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 bg-rebeccapurple text-white">
      <div className="flex flex-col items-center justify-center flex-grow">
         <div
          className={`w-48 h-48 rounded-full flex items-center justify-center mb-8 cursor-pointer ${isListening ? 'bg-red-500' : 'bg-gray-300'}`}
          onClick={toggleListening}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-24 w-24 ${isListening ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 0V4m0 14a2 2 0 002-2m-2 2a2 2 0 01-2-2m2 2v-4m-2 4h4m-2-4h-4m2 0v4m0 0h-4" />
          </svg>
        </div>

        <div className="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center">
           <div className="text-white text-center">AI Visual</div>
        </div>

        <div className="mt-8 w-full max-w-md bg-white/20 backdrop-blur-md p-4 rounded-md shadow-md overflow-y-auto" style={{ maxHeight: '200px' }}>
           {conversation.map((turn, index) => (
            <p key={index} className={`mb-2 text-left ${turn.startsWith('User:') ? 'text-gray-800' : 'text-blue-900 font-semibold'}`}>{turn}</p>
           ))
           }
           {interimTranscript && (
            <p className="mb-2 text-gray-600 text-left italic">{interimTranscript}</p>
           )}
           {!isListening && conversation.length === 0 && !interimTranscript && (
            <p className="text-center text-gray-800">Tap the microphone to start speaking.</p>
           )}
        </div>


        <p className="mt-4 text-lg text-center">{isListening ? 'Listening...' : 'Tap the microphone to start speaking.'}</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-around items-center">
        <div className="flex flex-col items-center">
          <span>🏠</span>
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <span>⭐️</span>
          <span className="text-xs">Subscription</span>
        </div>
        <div className="flex flex-col items-center">
          <span>👤</span>
          <span className="text-xs">Profile</span>

        </div>


      </div>

    </div>


  );
};

export default HomePage;
