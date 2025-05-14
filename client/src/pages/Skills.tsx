import { motion } from "framer-motion";
import Skills from "./components/Skills";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SEO from "@/components/ui/seo";

export default function SkillsPage() {
  const seoProps = {
    title: "Skills & Expertise of Muhammad Hamid Raza - Full-Stack Developer",
    description: "Explore the technical skills and expertise of Muhammad Hamid Raza, a Full-Stack Developer proficient in MERN stack, frontend, backend, and real-time communication technologies.",
    keywords: "Muhammad Hamid Raza, Full-Stack Developer, MERN stack, skills, expertise, frontend, backend, database, real-time communication, web development",
    image: "/attached_assets/logo.png?v=1", // Replace with actual image URL
    url: "https://muhammadhamidraza.vercel.app/skills", // Replace with actual skills page URL
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Muhammad Hamid Raza",
      jobTitle: "Full-Stack Developer",
      url: "https://muhammadhamidraza.vercel.app/skills",
      description: "A Full-Stack Developer with expertise in MERN stack, including frontend skills (HTML5, CSS3, JavaScript, React.js, Next.js), backend (Node.js, Express.js), databases (MongoDB), and real-time communication (Socket.io, WebSocket).",
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
            <h1 className="text-4xl font-bold mb-4">My Skills & Expertise</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive overview of my technical capabilities and professional expertise
            </p>
          </motion.div>
        </div>
        <Skills />
      </main>
      <Footer />
    </div>
  );
}