import "styles/tailwind.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-rebeccapurple">{children}</body> {/* Added bg-rebeccapurple class */}
    </html>
  );
}