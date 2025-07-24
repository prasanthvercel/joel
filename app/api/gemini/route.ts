// app/api/gemini/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = process.env.GEMINI_API_KEY; // Assuming your Gemini API key env var name

if (!geminiApiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable.');
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

// Handle POST requests
export async function POST(request: Request) {
  try {
    const { text } = await request.json(); // Assuming the request body has a 'text' property

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // Choose a model that supports text generation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Or another suitable model

    const result = await model.generateContent(text);
    const response = await result.response;
    const geminiText = response.text();

    return NextResponse.json({ text: geminiText });

  } catch (error) {
    console.error('Error interacting with Gemini API:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

// Handle other HTTP methods if needed (e.g., GET)
// export async function GET(request: Request) {
//   return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
// }
