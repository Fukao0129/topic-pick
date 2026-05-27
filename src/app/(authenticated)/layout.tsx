import { Header } from "@/src/components/header/header";
import { SnackbarProvider } from "@/src/components/ui/snackbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8 w-full">
        <SnackbarProvider>{children}</SnackbarProvider>
      </main>
    </>
  );
}
