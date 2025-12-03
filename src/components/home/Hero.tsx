import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useLanguage } from "../../contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!hero || !video || !overlay || !content) return;

    // Create the 3D depth zoom effect timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: false,
      },
    });

    // Scale up the video for zoom-in depth effect
    tl.to(video, {
      scale: 1.5,
      ease: "none",
    }, 0);

    // Fade and push content away
    tl.to(content, {
      y: -100,
      opacity: 0,
      ease: "none",
    }, 0);

    // Darken overlay for smooth transition
    tl.to(overlay, {
      opacity: 1,
      ease: "none",
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Video with 3D zoom layer */}
      <div
        ref={videoRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/herovidliveclub.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlays - Minimal for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* Scroll-reactive darkening overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 will-change-transform"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center tracking-[0.1em] text-shadow animate-fade-up">
          NIGHTS ARE BETTER AT LIVECLUB
        </h1>

        <Link
          to="/club"
          className="mt-8 btn-outline-white rounded-full animate-fade-up delay-200"
        >
          {t('hero.cta')}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
