import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "../../../../IMAGE.jpg";

export default function Hero() {
  return (
    <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:20px_20px]" />

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text dark:from-primary-foreground dark:to-primary-foreground/80">
              Muhammad Hamid Raza
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 dark:text-foreground/90 mb-8">
            A passionate Full-Stack Developer with expertise in MERN Stack and
            modern web technologies. Saylani Mass IT Training Graduate with over
            a year of experience.
          </p>
          <Button asChild size="lg" className="group">
            <a href="#contact">
              Let's Talk{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-square mx-auto max-w-md"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="relative rounded-full overflow-hidden border-8 border-background shadow-2xl">
            <img
              src={Image}
              alt="Professional headshot"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}