interface PageHeroProps {
  title: string;
  image: string;
  isVideo?: boolean;
}

const PageHero = ({ title, image, isVideo = false }: PageHeroProps) => {
  return (
    <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
      {/* Background Media */}
      {isVideo ? (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={image} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-[0.1em] animate-fade-up uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHero;
