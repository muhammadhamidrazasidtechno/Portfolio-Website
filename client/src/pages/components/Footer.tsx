import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-10 border-t border-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Information</h3>
            <div className="space-y-3 text-muted-foreground">
              <a
                href="mailto:muhammadhamidr92@gmail.com"
                className="flex items-center gap-2 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>muhammadhamidr92@gmail.com</span>
              </a>
              <a
                href="tel:+923160010801"
                className="flex items-center gap-2 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+923160010801</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Kharadar Karachi</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary dark:hover:text-primary transition-colors" asChild>
                <a href="/about">About</a>
              </Button>
              <br />
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary dark:hover:text-primary transition-colors" asChild>
                <a href="/skills">Skills</a>
              </Button>
              <br />
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary dark:hover:text-primary transition-colors" asChild>
                <a href="/projects">Projects</a>
              </Button>
              <br />
              <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary dark:hover:text-primary transition-colors" asChild>
                <a href="/contact">Contact</a>
              </Button>
            </div>
          </div>

          {/* Connect With Me */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Me</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/muhammadhamidraza"
                className="text-muted-foreground hover:text-primary dark:text-white dark:hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/hamid-raza-b249162a8"
                className="text-muted-foreground hover:text-primary dark:text-white dark:hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:muhammadhamidr92@gmail.com"
                className="text-muted-foreground hover:text-primary dark:text-white dark:hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Muhammad Hamid Raza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;