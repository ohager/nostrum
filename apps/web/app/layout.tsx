import "./global.css"
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-neutral scrollbar-thumb-rounded-xl">{children}</body>
    </html>
  );
}
