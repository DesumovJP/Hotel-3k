"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Footer } from "@/components/organisms";
import { SectionHero, SectionCTA, SectionTwoColumn, MiniGallery, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { BreadcrumbsInline } from "@/components/molecules";
import { Clock, Phone, Waves, Flame, Droplets, Sparkles, Heart, Baby, Hand, Footprints, Check } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const facilities = [
  {
    id: "pool",
    name: "Swimming Pool",
    description: "Heated indoor pool with Jacuzzi and children's pool. Swimming lessons on Tuesdays.",
    icon: Waves,
    highlight: "Non-guests: €9 adults, €5 children",
    image: "/wellness/zwembad-600x450_1.jpg",
  },
  {
    id: "sauna",
    name: "Finnish Sauna & Steam Bath",
    description: "Traditional Finnish sauna and Turkish steam bath. Customary use without swimwear during free hours.",
    icon: Flame,
    highlight: "Free for guests 16:30-19:00",
    image: "/wellness/finse-sauna-en-turks-stoombad-600x450_1.jpg",
  },
  {
    id: "solarium",
    name: "Solarium",
    description: "Quick tanning service available for guests and visitors.",
    icon: Droplets,
    highlight: "€11 per session",
    image: "/wellness/solarium-600x450.jpg",
  },
];

const treatmentCategories = [
  {
    id: "massage",
    name: "Massage",
    icon: Hand,
    image: "/wellness/massage-600x400_2.jpg",
    treatments: [
      { name: "Relaxing Massage", duration: "25 min", price: "€50" },
      { name: "Relaxing Massage", duration: "55 min", price: "€85" },
      { name: "Hot Stone Massage", duration: "40 min", price: "€70" },
      { name: "Hot Stone Massage", duration: "75 min", price: "€110" },
      { name: "Scalp Massage", duration: "15 min", price: "€25" },
    ],
  },
  {
    id: "facial-women",
    name: "Facial (Women)",
    icon: Sparkles,
    image: "/wellness/gezichtsbehandelingen-dames-600x400_1.jpg",
    treatments: [
      { name: "Sea Treatment", duration: "55 min", price: "€85" },
      { name: "Organic Facial", duration: "40 min", price: "€65" },
      { name: "Anti-Aging Treatment", duration: "90 min", price: "€135" },
    ],
  },
  {
    id: "facial-men",
    name: "Facial (Men)",
    icon: Sparkles,
    image: "/wellness/gezichtsbehandelingen-heren-600x400_1.jpg",
    treatments: [
      { name: "Men's Facial", duration: "55 min", price: "€85" },
      { name: "Men's Deluxe Facial", duration: "90 min", price: "€110" },
    ],
  },
  {
    id: "body",
    name: "Body Treatments",
    icon: Heart,
    image: "/wellness/lichaamsbehandelingen-600x400_2.jpg",
    treatments: [
      { name: "Body Peeling", duration: "30 min", price: "€60" },
      { name: "Algae Packing", duration: "45 min", price: "€85" },
      { name: "Pregnancy Treatment", duration: "60 min", price: "€110" },
    ],
  },
  {
    id: "texel",
    name: "Texel Treatments",
    icon: Waves,
    featured: true,
    image: "/wellness/texelse-behandelingen-600x400_2.jpg",
    treatments: [
      { name: "Texel Feet (honey & sheepscream)", duration: "25 min", price: "€40" },
      { name: "Texel Feeling", duration: "55 min", price: "€85" },
      { name: "Opduin Feeling Deluxe", duration: "90 min", price: "€130" },
    ],
  },
  {
    id: "hands-feet",
    name: "Hands & Feet",
    icon: Footprints,
    image: "/wellness/handen-en-voeten-600x400_1.jpg",
    treatments: [
      { name: "Manicure", duration: "35 min", price: "€50" },
      { name: "Luxury Manicure", duration: "55 min", price: "€75" },
      { name: "Pedicure", duration: "45 min", price: "€65" },
      { name: "Foot Reflex Massage", duration: "55 min", price: "€85" },
    ],
  },
  {
    id: "kids",
    name: "Kids Wellness",
    icon: Baby,
    image: "/wellness/kinder-wellness-600x400.jpg",
    treatments: [
      { name: "Kids Massage", duration: "25 min", price: "€29" },
      { name: "Kids Manicure", duration: "25 min", price: "€29" },
      { name: "Kids Facial", duration: "25 min", price: "€29" },
    ],
  },
];

const galleryImages = [
  "/wellness/zwembad-600x450_1.jpg",
  "/wellness/finse-sauna-en-turks-stoombad-600x450_1.jpg",
  "/wellness/massage-600x400_2.jpg",
  "/wellness/openingstijden-beautysalon-600x450.jpg",
  "/wellness/texelse-behandelingen-600x400_2.jpg",
  "/wellness/solarium-600x450.jpg",
];

export default function WellnessPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowFloatingCTA(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Floating CTA - Mobile */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showFloatingCTA ? 0 : 100, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <a
          href="tel:+31222317445"
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white shadow-xl rounded-full text-sm font-medium"
        >
          <Phone size={16} />
          Book Treatment
        </a>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHero
          label="Wellness in Opduin"
          title="Personal Attention"
          description="There is nothing like personal attention. Our certified beauty specialists work with Thalgo — light and fresh quality products with its origin from the sea."
          backgroundImage="/wellness/zwembad-600x450_1.jpg"
          youtubeId="6JUXaDyk4Lo"
          primaryAction={{
            label: "Book a Treatment",
            href: "tel:+31222317445",
            icon: Phone,
          }}
          infoStrip={{
            items: [
              { icon: Clock, label: "Pool", value: "9:00–21:00" },
              { icon: Clock, label: "Salon", value: "By appointment" },
              { icon: Check, value: "Free sauna for guests", highlight: true },
            ],
            phoneNumber: "+31 222 317 445",
          }}
        />

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Wellness" }]} />
          </div>
        </section>

        {/* Philosophy */}
        <SectionTwoColumn
          label="Beauty Salon"
          title="Thalgo Marine Cosmetics"
          content={[
            "Our certified beauty specialists work with Thalgo — light and fresh quality products with its origin from the sea. French marine cosmetics renowned for their purity and effectiveness.",
            "All treatments are by appointment only and accessible to non-guests as well. Book your treatment by phone or check availability in our online booking tool.",
            "For private sauna bookings: €12.50 per person per hour.",
          ]}
          image="/wellness/openingstijden-beautysalon-600x450.jpg"
          imageAlt="Beauty Salon Opduin"
          imagePosition="right"
          background="white"
        />

        <SectionBlend from="white" to="sand-100" />

        {/* Facilities */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                Facilities
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink">
                Pool, Sauna & Steam
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <motion.article
                  key={facility.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                  className="group bg-white"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-shell text-xs tracking-[0.15em] uppercase mb-2 block">
                      {facility.highlight}
                    </span>
                    <h3 className="font-display text-2xl text-ink mb-2 group-hover:text-shell transition-colors">
                      {facility.name}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {facility.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* Treatments */}
        <section className="py-20 md:py-28 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                Treatments
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink mb-6">
                Our Treatment Menu
              </h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                From soothing massages to revitalizing facials.
                Signature Texel treatments with local honey and Noordkroon sheepscream.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {treatmentCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={cn(
                      "border-t border-neutral-200 pt-6",
                      category.featured && "border-t-2 border-shell"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <Icon size={20} className="text-shell" />
                      <h3 className="font-display text-xl text-ink">
                        {category.name}
                      </h3>
                      {category.featured && (
                        <span className="text-xs text-shell uppercase tracking-wider">Signature</span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {category.treatments.map((treatment, i) => (
                        <div key={i} className="flex justify-between items-baseline">
                          <div className="flex items-baseline gap-2">
                            <span className="text-ink">{treatment.name}</span>
                            <span className="text-neutral-400 text-sm">{treatment.duration}</span>
                          </div>
                          <span className="text-shell font-medium">{treatment.price}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Gallery */}
        <MiniGallery
          title="Wellness Gallery"
          images={galleryImages}
          columns={3}
          background="sand-100"
        />

        <SectionBlend from="sand-100" to="white" />

        {/* CTA */}
        <SectionCTA
          icon={Sparkles}
          title="Book Your Treatment"
          description="Our salon is open to everyone, not just hotel guests. All treatments are by appointment only. Call to reserve your personal wellness experience."
          background="white"
          actions={[
            { label: "+31 222 317 445", href: "tel:+31222317445", icon: Phone },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
