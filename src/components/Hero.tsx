import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpeg";

interface HeroProps {
  data: {
    name: string;
    title: string;
    summary: string;
    location: string;
    age: number;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    languages: Array<{ language: string; level: string; flag: string }>;
  };
}

export const Hero = ({ data }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-12 px-4 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
      
      <div className="container relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center animate-fade-in">
          {/* Profile Image */}
          <div className="mb-6 overflow-hidden rounded-full shadow-custom-lg ring-4 ring-white/20">
            <img
              src={profileImage}
              alt={data.name}
              className="h-32 w-32 object-cover sm:h-40 sm:w-40"
            />
          </div>

          {/* Name and Title */}
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {data.name}
          </h1>
          <p className="mb-4 text-xl text-white/90 sm:text-2xl">
            👨🏽‍💻 {data.title}
          </p>

          {/* Languages */}
          <div className="mb-6 flex flex-wrap justify-center gap-2 text-white/90">
            <span className="font-medium">🗣️ Languages:</span>
            {data.languages.map((lang, index) => (
              <span key={index}>
                {lang.flag} {lang.language} ({lang.level})
              </span>
            ))}
          </div>

          {/* Summary */}
          <p className="mb-8 max-w-3xl text-base text-white/90 sm:text-lg leading-relaxed">
            {data.summary}
          </p>

          {/* Contact Info - Grid for mobile, flex for larger screens */}
          <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="justify-start gap-2 bg-white/95 text-primary hover:bg-white"
              asChild
            >
              <a href={`mailto:${data.email}`}>
                <Mail className="h-4 w-4" />
                <span className="truncate">{data.email}</span>
              </a>
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              className="justify-start gap-2 bg-white/95 text-primary hover:bg-white"
              asChild
            >
              <a href={`tel:${data.phone}`}>
                <Phone className="h-4 w-4" />
                {data.phone}
              </a>
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              className="justify-start gap-2 bg-white/95 text-primary hover:bg-white"
              asChild
            >
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              className="justify-start gap-2 bg-white/95 text-primary hover:bg-white"
              asChild
            >
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Location and Age */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {data.location}
            </span>
            <span>🎁 {data.age} years</span>
          </div>
        </div>
      </div>
    </section>
  );
};
