import { getMeUser } from "@/app/_utilities/getMeUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header/index";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  await getMeUser({
    nullUserRedirect: `/login`,
  });

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
