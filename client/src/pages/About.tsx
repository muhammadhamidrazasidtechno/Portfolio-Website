import { motion } from "framer-motion";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEO from "@/components/ui/seo";

export default function AboutPage() {
  const seoProps = {
    title: "About Muhammad Hamad Raza - Full-Stack Developer",
    description: "Learn about Muhammad Hamad Raza, a passionate Full-Stack Developer with over 2 years of experience in MERN stack and expertise in building intuitive web applications.",
    keywords: "Muhammad Hamad Raza, Full-Stack Developer, MERN stack, professional experience, education, training, web development",
    image: "/attached_assets/logo.png?v=1", // Replace with actual image URL
    url: "https://muhammadhamidraza.vercel.app/about", // Replace with actual about page URL
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Muhammad Hamad Raza",
      jobTitle: "Full-Stack Developer",
      url: "https://muhammadhamidraza.vercel.app/about",
      description: "A passionate Full-Stack Developer with over 2 years of experience in MERN stack development, specializing in real-time applications and responsive UI/UX solutions. Educated at Saylani Mass IT Training with advanced web development and database management skills.",
      email: "muhammadhamidr92@gmail.com",
      telephone: "+92-316-0010801",
      sameAs: [
        "https://www.linkedin.com/in/hamid-raza-b249162a8", // Replace with actual LinkedIn URL
        "https://github.com/muhammadhamidraza" // Replace with actual GitHub URL
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO {...seoProps} />
      <Navbar />
      <main className="pt-24 pb-20">
        <About />
      </main>
      <Footer />
    </div>
  );
}