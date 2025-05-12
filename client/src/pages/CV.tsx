
import CV from "./components/CV";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CV />
      <Footer />
    </div>
  );
}
