import { motion } from "framer-motion";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEO from "@/components/ui/seo";

export default function ContactPage() {
  const seoProps = {
    title: "Contact Muhammad Hamad Raza - Full-Stack Developer",
    description: "Get in touch with Muhammad Hamad Raza, a Full-Stack Developer, to discuss your web development projects. Contact form and details available.",
    keywords: "Muhammad Hamad Raza, Full-Stack Developer, contact, get in touch, web development, MERN stack",
    image: "/attached_assets/logo.png?v=1", // Replace with actual image URL
    url: "https://muhammadhamidraza.vercel.app/contact", // Replace with actual contact page URL
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Muhammad Hamad Raza",
      jobTitle: "Full-Stack Developer",
      url: "https://muhammadhamidraza.vercel.app/contact",
      description: "Contact Muhammad Hamad Raza, a Full-Stack Developer with expertise in MERN stack, to collaborate on innovative web projects. Reach out via email or phone.",
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
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how we can work together to bring your ideas to life
            </p>
          </motion.div>
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}