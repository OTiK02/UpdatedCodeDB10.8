import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon } from "lucide-react";
import SEO from "@/components/SEO";

const colleges = [
  {
    name: "Annual Tech Fest 2024",
    images: [
      "https://images.unsplash.com/photo-1540575467063-a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-14757227785-f74eccf877e2?w=800&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224cw=800&q=80",
    ],
  },
  {
    name: "Robotics Workshop Series",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w0&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    ],
  },
  {
    name: "Hackathon Champions 2024",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80080",
      "/src/assets/images/gallery/hackathon3.jpg",
    ],
  },
  
];

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const handleDownload = (sectionName: string, images: string[]) => {
    images.forEach((url, index) => {
      window.open(url, "_blank");
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Gallery | Event Memories & Highlights"
        description="Explore our collection of memorable moments from tech fests, workshops, hackathons, and cultural events."
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Gallery Page
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Relive the moments that shaped our journey through innovation, learning, and celebration
            </p>
          </div>

          {/* Gallery Sections */}
          <div className="space-y-20">
            {colleges.map((section, sectionIndex) => (
              <section key={sectionIndex} className="space-y-8">
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {section.name}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-elegant transition-all duration-500"
                      onMouseEnter={() => setHoveredIndex(`${sectionIndex}-${imageIndex}`)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Image Container */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={image}
                          alt={`${section.name} - Image ${imageIndex + 1}`}
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            hoveredIndex === `${sectionIndex}-${imageIndex}`
                              ? "scale-110 brightness-110"
                              : "scale-100 brightness-100"
                          }`}
                          loading="lazy"
                        />
                      </div>

                      {/* Overlay on Hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent transition-opacity duration-500 ${
                          hoveredIndex === `${sectionIndex}-${imageIndex}`
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-sm font-medium text-foreground">
                            Photo {imageIndex + 1} of {section.images.length}
                          </p>
                        </div>
                      </div>

                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40" />
                    </div>
                  ))}
                </div>

                {/* Download Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => handleDownload(section.name, section.images)}
                    size="lg"
                    className="group gap-2 bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Download className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                    Download All Images
                  </Button>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
