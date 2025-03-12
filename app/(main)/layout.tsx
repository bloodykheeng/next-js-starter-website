import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <div className="flex flex-col min-h-screen">
        <Header />
        {/* Main Content */}
        <main className="flex-grow h-full">
          {children}
        </main>
        {/* Footer Always at Bottom */}
        <Footer />
      </div>

    </>
  );
}


