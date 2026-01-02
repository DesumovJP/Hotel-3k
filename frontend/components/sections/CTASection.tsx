"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070"
          alt="Grand Hotel Opduin sunset"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
              Begin your stay
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Ready for stillness?
            </h2>

            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Escape to where the horizon stretches endlessly and the only
              schedule is the rhythm of the tides.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-shell text-navy hover:bg-white transition-colors text-sm tracking-wide uppercase"
              >
                Check Availability
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white text-white hover:bg-white hover:text-navy transition-colors text-sm tracking-wide uppercase"
              >
                Contact Us
              </Link>
            </div>

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 text-sm">
              <a
                href="tel:+31222123456"
                className="flex items-center gap-2 hover:text-shell transition-colors"
              >
                <Phone size={14} />
                +31 222 123 456
              </a>
              <span className="hidden sm:block">|</span>
              <span>info@grandhotelOpduin.nl</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: easeOutExpo }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </section>
  );
}
