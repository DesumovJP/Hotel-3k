"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { SplitText, MagneticWrapper } from "@/components/animations";
import { Clock, Phone, FileText, ExternalLink } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const YOUTUBE_VIDEO_ID = "8Raur-TG4_A";

// Menu PDFs - these would come from Strapi in production
const menuPDFs = {
  dinner: "https://www.opduin.nl/upload/files/opduin_menukaart%20EN%20vanaf%2012%20dec.pdf",
  lunch: "https://www.opduin.nl/upload/files/opduin_lunchkaart_A5%20(2).pdf",
};

export default function RestaurantPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.6]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showYoutube = !isMobile;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0`;

  return (
    <>
      <Header />

      <main>
        {/* Hero with YouTube Video */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden bg-navy">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0"
          >
            {/* YouTube Video Background */}
            {showYoutube && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <iframe
                  src={youtubeEmbedUrl}
                  title="Restaurant background video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => setYoutubeLoaded(true)}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[177.78vh] h-[100vh] min-w-[100vw] min-h-[56.25vw]",
                    "pointer-events-none",
                    "transition-opacity duration-1000",
                    youtubeLoaded ? "opacity-100" : "opacity-0"
                  )}
                  style={{ border: "none" }}
                />
              </div>
            )}

            {/* Fallback Image */}
            <div
              className={cn(
                "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
                showYoutube && youtubeLoaded ? "opacity-0" : "opacity-100"
              )}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974')" }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-navy"
            style={{ opacity: overlayOpacity }}
          />

          {/* Bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

          <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Dining
                </span>
              </motion.div>

              <div className="overflow-hidden mb-4">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                >
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
                    <SplitText type="words" animation="fadeUp" staggerDelay={0.05} delay={0.2}>
                      From Sea to Table
                    </SplitText>
                  </h1>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="text-lg text-white/80 max-w-lg"
              >
                Our kitchen celebrates the island's bounty with simplicity and
                respect for tradition.
              </motion.p>
            </div>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: easeOutExpo }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </section>

        {/* Info Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                  At Restaurant Opduin, we let the ingredients speak. Fresh catches from
                  the Wadden Sea arrive each morning. Our lamb grazes on the salt marshes
                  that give Texel its distinctive character. Vegetables come from island
                  gardens just minutes away.
                </p>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  The result is a menu that changes with the seasons and tells the story
                  of this remarkable island. Each dish is prepared with care, presented
                  without pretense, and served in an atmosphere of quiet elegance.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticWrapper strength={0.15}>
                    <Link
                      href="/book?type=restaurant"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                    >
                      Reserve a Table
                    </Link>
                  </MagneticWrapper>
                  <MagneticWrapper strength={0.15}>
                    <a
                      href="tel:+31222317445"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                    >
                      <Phone size={16} />
                      Call Us
                    </a>
                  </MagneticWrapper>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
                className="bg-sand-100 p-8 lg:p-10"
              >
                <h3 className="font-display text-2xl text-ink mb-6">Hours & Information</h3>

                <div className="space-y-6">
                  <div>
                    <p className="font-medium mb-2 flex items-center gap-2 text-ink">
                      <Clock size={16} className="text-shell" />
                      Breakfast
                    </p>
                    <p className="text-neutral-600">7:00 – 10:30 (hotel guests)</p>
                  </div>

                  <div>
                    <p className="font-medium mb-2 flex items-center gap-2 text-ink">
                      <Clock size={16} className="text-shell" />
                      Lunch
                    </p>
                    <p className="text-neutral-600">12:00 – 14:30</p>
                  </div>

                  <div>
                    <p className="font-medium mb-2 flex items-center gap-2 text-ink">
                      <Clock size={16} className="text-shell" />
                      Dinner
                    </p>
                    <p className="text-neutral-600">18:00 – 22:00 (last seating 21:00)</p>
                  </div>

                  <div className="pt-4 border-t border-sand-300">
                    <p className="text-sm text-neutral-500">
                      Reservations recommended for dinner. Smart casual dress code.
                      Please inform us of any dietary requirements when booking.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Menu PDF Buttons Section */}
        <section className="py-16 bg-sand">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-10"
            >
              <span className="text-overline text-shell tracking-widest mb-3 block">
                Our Menus
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                View Full Menu
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Dinner Menu Button */}
              <a
                href={menuPDFs.dinner}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 bg-white hover:bg-navy hover:text-white transition-all duration-300 border border-sand-300 hover:border-navy"
              >
                <div className="w-14 h-14 rounded-full bg-shell/20 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <FileText size={24} className="text-navy group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-xl text-ink group-hover:text-white transition-colors">
                    Dinner Menu
                  </h4>
                  <p className="text-sm text-neutral-500 group-hover:text-white/70 transition-colors">
                    View our evening selection
                  </p>
                </div>
                <ExternalLink size={18} className="text-shell group-hover:text-white transition-colors" />
              </a>

              {/* Lunch Menu Button */}
              <a
                href={menuPDFs.lunch}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 bg-white hover:bg-navy hover:text-white transition-all duration-300 border border-sand-300 hover:border-navy"
              >
                <div className="w-14 h-14 rounded-full bg-shell/20 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <FileText size={24} className="text-navy group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-xl text-ink group-hover:text-white transition-colors">
                    Lunch Menu
                  </h4>
                  <p className="text-sm text-neutral-500 group-hover:text-white/70 transition-colors">
                    View our midday selection
                  </p>
                </div>
                <ExternalLink size={18} className="text-shell group-hover:text-white transition-colors" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-12"
            >
              <span className="text-overline text-shell tracking-widest mb-3 block">
                Gallery
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                The Restaurant Experience
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
                "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974",
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974",
              ].map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative aspect-square overflow-hidden group"
                >
                  <Image
                    src={src}
                    alt={`Restaurant gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
