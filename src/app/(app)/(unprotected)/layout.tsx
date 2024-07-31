import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata, Viewport } from "next";

// Define metadata for the Peckham Soup Kitchen project
export const metadata: Metadata = {
  title: "Peckham Soup Kitchen - Community Support",
  description: "Providing essential services and support to the Southwark community through food provision and community programs.",
};


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-visual',
}

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
