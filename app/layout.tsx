import "styles/tailwind.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head> {/* Added head tag */}
        <link rel="icon" href="/logo.jpg" /> {/* Added favicon link */}
      </head>
      <body className="bg-rebeccapurple">{children}</body>
    </html>
  );
}