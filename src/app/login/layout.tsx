export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 md:p-8">
      {children}
    </main>
  );
}
