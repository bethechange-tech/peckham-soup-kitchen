import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container mx-auto my-8 md:my-16 px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
