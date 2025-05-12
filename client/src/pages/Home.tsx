import { Link } from "wouter";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/ui/seo";
export default function Home() {
  const seoProps = {
    title: "Muhammad Hamad Raza - Full-Stack Developer Portfolio",
    description: "Portfolio of Muhammad Hamad Raza, a passionate Full-Stack Developer with expertise in MERN stack and modern web technologies. Explore my projects, skills, and experience.",
    keywords: "Muhammad Hamad Raza, Full-Stack Developer, MERN stack, web development, portfolio, projects, skills",
    image: "/attached_assets/logo.png?v=1", // Replace with actual image URL
    url: "https://muhammadhamidraza.vercel.app/", // Replace with actual website URL
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Muhammad Hamad Raza",
      jobTitle: "Full-Stack Developer",
      url: "https://muhammadhamidraza.vercel.app/",
      description: "A passionate Full-Stack Developer with expertise in MERN stack and over 2 years of experience in building intuitive, responsive, and user-focused applications.",
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
      <main>
        <Hero />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">About Me</h2>
              <Button variant="outline" asChild>
                <Link href="/about">
                  View More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <About />
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <Button variant="outline" asChild>
                <Link href="/projects">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Projects limit={4} />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Skills Overview</h2>
              <Button variant="outline" asChild>
                <Link href="/skills">
                  View All Skills <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Skills preview={true} />
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Contact</h2>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Page <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <Contact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}