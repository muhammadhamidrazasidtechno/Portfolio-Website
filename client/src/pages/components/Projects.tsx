import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Iptv from "@images/iptv.png";
import Iptv1 from "@images/iptv1.png";
import Iptv2 from "@images/iptv2.png";
import Iptv3 from "@images/iptv3.png";
import Youtube from "@images/youtube.png";
import Youtube1 from "@images/youtube1.png";
import Youtube2 from "@images/youtube2.png";
import RealState from "@images/realstate.png";
import RealState1 from "@images/realstate1.png";
import RealState2 from "@images/realstate2.png";
import RealState3 from "@images/realstate3.png";
import Zwa from "@images/zwa.png";
import Zwa1 from "@images/zwa1.png";
import Zwa2 from "@images/zwa2.png";
import Zwa3 from "@images/zwa3.png";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define TypeScript interfaces
interface Project {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
}

interface ProjectsProps {
  limit?: number;
}

interface ArrowProps {
  onClick?: () => void;
}

const allProjects: Project[] = [
  {
    title: "Feature-Rich IPTV Management Dashboard",
    description:
      "A robust IPTV dashboard for managing users, content, and servers. Features include user/reseller management, stream control, movie/series management, EPG, channel creation, and server stats.",
    images: [Iptv, Iptv1, Iptv2, Iptv3],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "Node.js", "Express"],
  },
  {
    title: "BuyHomeForLess | Affordable Real Estate",
    description:
      "A real estate platform specializing in affordable and distressed properties, offering NPA, NPL, bank-owned, foreclosure, and fixer-upper homes with mortgage financing for foreigners.",
    images: [RealState, RealState1, RealState2, RealState3],
    technologies: ["React", "MongoDB", "Tailwind CSS", "Node.js", "Express", "Socket.io"],
  },
  {
    title: "YouTube Video Downloader & Trimmer",
    description:
      "An online tool to download and trim YouTube videos easily. Paste a link, cut to the desired length, and download without watermarks.",
    images: [Youtube, Youtube1, Youtube2],
    technologies: ["Next Js", "Node.js"],
  },
  {
    title: "Streamlined Admin Dashboard",
    description:
      "A user-friendly admin panel with a clean interface, offering key metrics, order status visualizations, and recent activity tracking for efficient management.",
    images: [Zwa, Zwa1, Zwa2, Zwa3],
    technologies: ["React", "Firebase", "Material-UI", "Chart.js", "Socket.io", "Node.js", "Express"],
  },
];

// Custom arrow components for the slider
const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary/80 hover:bg-primary text-white rounded-full p-2 shadow-lg z-10 transition-colors"
  >
    <ChevronRight className="h-6 w-6" />
  </button>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary/80 hover:bg-primary text-white rounded-full p-2 shadow-lg z-10 transition-colors"
  >
    <ChevronLeft className="h-6 w-6" />
  </button>
);

export default function Projects({ limit }: ProjectsProps) {
  const projects = limit ? allProjects.slice(0, limit) : allProjects;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-primary/50 rounded-full hover:bg-primary transition-colors" />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="pb-4">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
  };

  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work, featuring web applications built with modern technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/20 dark:bg-primary/50 text-primary dark:text-white font-medium rounded-full text-sm shadow-sm hover:bg-primary/30 dark:hover:bg-primary/60 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => openModal(project)}
                    className="hover:bg-primary hover:text-white transition-colors"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal with project details */}
      {isModalOpen && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-background p-6 rounded-lg max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-primary/20"
              onClick={closeModal}
            >
              <X className="h-8 w-8" />
            </Button>
            <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
            <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
            <Slider {...sliderSettings}>
              {selectedProject.images.map((image, index) => (
                <div key={index} className="p-4">
                  <img
                    src={image}
                    alt={`Project Image ${index + 1}`}
                    className="w-full h-auto max-h-[50vh] object-contain rounded-lg"
                  />
                </div>
              ))}
            </Slider>
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/20 dark:bg-primary/50 text-primary dark:text-white font-medium rounded-full text-sm shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}