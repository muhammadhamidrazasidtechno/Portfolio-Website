import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(0,0,0,0.02),transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,255,255,0.01),transparent)]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text dark:from-primary-foreground dark:to-primary-foreground/80">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A passionate Full-Stack Web Developer with over 2 years of experience in
            building intuitive, responsive, and feature-rich web applications.
            Graduate of Saylani Mass IT Training with expertise in MERN Stack
            development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="backdrop-blur-sm bg-background/95 border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <BadgeCheck className="h-6 w-6 text-primary" />
                  Professional Experience
                </h3>
                <ul className="space-y-6 text-muted-foreground">
                  <li className="border-l-2 border-primary/20 pl-6 transition-all hover:border-primary">
                    <h4 className="font-medium text-foreground text-lg">SID Techno</h4>
                    <p className="text-sm mt-1">Full Stack Developer • 2 Years</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                        Led MERN Stack Development Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                        Implemented Real-Time Applications
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                        Optimized Database Performance
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
                        Developed Responsive UI/UX Solutions
                      </li>
                    </ul>
                  </li>
                  <li className="border-l-2 border-primary/20 pl-4">
                    <h4 className="font-medium text-foreground">Freelance Projects</h4>
                    <p className="text-sm">Full Stack Developer</p>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                      <li>✦ Custom Web Applications</li>
                      <li>✦ API Integration & Development</li>
                      <li>✦ Database Design & Management</li>
                    </ul>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="backdrop-blur-sm bg-background/95 border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <BadgeCheck className="h-6 w-6 text-primary" />
                  Education & Training
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary/60"></span>
                    <span>Saylani Mass IT Training Graduate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary/60"></span>
                    <span>Advanced Web Development</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary/60"></span>
                    <span>Modern JavaScript (ES6+)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary/60"></span>
                    <span>React & Node.js Specialization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary/60"></span>
                    <span>Database Management Systems</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}