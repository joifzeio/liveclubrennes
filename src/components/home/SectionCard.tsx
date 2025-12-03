import { Link } from "react-router-dom";

interface SectionCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
  secondaryLink?: string;
  secondaryLinkText?: string;
  reversed?: boolean;
}

const SectionCard = ({
  title,
  description,
  image,
  link,
  linkText,
  secondaryLink,
  secondaryLinkText,
  reversed = false,
}: SectionCardProps) => {
  return (
    <section className="relative py-24 bg-background overflow-hidden section-glow">
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={`flex flex-col ${
            reversed ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-12 lg:gap-20`}
        >
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="image-zoom rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to={link} className="btn-outline-white rounded-full">
                {linkText}
              </Link>
              {secondaryLink && secondaryLinkText && (
                <Link to={secondaryLink} className="btn-outline-white rounded-full">
                  {secondaryLinkText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCard;
