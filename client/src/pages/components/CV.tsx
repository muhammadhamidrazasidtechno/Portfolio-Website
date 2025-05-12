import jspdf from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "../../../../IMAGE.jpg";

import { Download, Phone, Mail, MapPin, Globe } from "lucide-react";

export default function CV() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div
            id="cv-content"
            className="max-w-4xl mx-auto grid grid-cols-3 gap-8 bg-background"
          >
            {/* Left Sidebar */}
            <div className="col-span-1 bg-primary/10 p-6 space-y-8">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary mb-4">
                  <img
                    src={Image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-2">Muhammad Hamid Raza</h1>
                <p className="text-lg text-muted-foreground">Web Developer</p>
              </div>

              {/* Contact Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 border-b-2 border-primary/20 pb-2">
                  CONTACT
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <p>+92 123 4567</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <p>your.email@example.com</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <p>Your Location</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <p>www.portfolio.com</p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 border-b-2 border-primary/20 pb-2">
                  SKILLS
                </h2>
                <ul className="space-y-2">
                  <li>Frontend & Backend Development</li>
                  <li>Coding Languages</li>
                  <li>Problem Solving</li>
                  <li>Logical Approach</li>
                  <li>Project Management</li>
                  <li>Team Leadership</li>
                </ul>
              </div>

              {/* Education Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 border-b-2 border-primary/20 pb-2">
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Masters in Computer Science</h3>
                    <p className="text-sm text-muted-foreground">
                      General University | 2018-2020
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">
                      Computer Science Engineering
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tech Institute | 2014-2018
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="col-span-2 p-6 space-y-8">
              {/* About Me Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary/20 pb-2">
                  ABOUT ME
                </h2>
                <p className="text-muted-foreground">
                  Passionate Full-Stack Developer with expertise in modern web
                  technologies. Dedicated to creating efficient, scalable, and
                  user-friendly applications while continuously learning and
                  adapting to new technologies.
                </p>
              </div>

              {/* Professional Summary */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Professional Summary
                  </h2>
                  <p className="text-muted-foreground">
                    Passionate Full-Stack Developer with over a year of
                    experience building intuitive, responsive, and feature-rich
                    web applications. Specializing in MERN Stack development
                    with a strong foundation from Saylani Mass IT Training.
                  </p>
                </CardContent>
              </Card>

              {/* Experience Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary/20 pb-2">
                  EXPERIENCE
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Lead Web Developer
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Company A | January 2023 - Present
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Led development team in creating innovative web solutions.
                      Implemented best practices and modern development
                      workflows.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      Senior Web Developer
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Company B | March 2021 - December 2022
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Developed and maintained multiple client websites.
                      Mentored junior developers and improved team productivity.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Junior Developer</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Company C | June 2020 - February 2021
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Assisted in developing web applications using modern
                      frameworks. Collaborated with senior developers on various
                      projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Technical Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Frontend</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>HTML5, CSS3, JavaScript (ES6+)</li>
                        <li>React.js, Next.js</li>
                        <li>Material-UI, Tailwind CSS, Bootstrap</li>
                        <li>Responsive Web Design</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Backend</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Node.js, Express.js</li>
                        <li>MongoDB, Firebase, PostgreSQL</li>
                        <li>RESTful APIs</li>
                        <li>WebSocket/Socket.io</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  <div>
                    <h3 className="font-medium">Saylani Mass IT Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Web Development Certification
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center mt-8">
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={async () => {
                const element = document.querySelector("#cv-content");
                if (!element) return;

                const canvas = await html2canvas(element as HTMLElement);
                const imgData = canvas.toDataURL(Image);

                const pdf = new jspdf({
                  orientation: "portrait",
                  unit: "px",
                  format: "a4",
                  hotfixes: ["px_scaling"],
                });

                const margin = 10;
                const imgWidth = pdf.internal.pageSize.getWidth() - margin * 2;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(
                  imgData,
                  "PNG",
                  margin,
                  margin,
                  imgWidth,
                  imgHeight,
                );
                pdf.save("Muhammad_Hamid_Raza_CV.pdf");
              }}
            >
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
