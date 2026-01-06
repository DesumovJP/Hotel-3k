"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline, FeatureGrid } from "@/components/molecules";
import { SectionHero, SectionCTA, SectionTwoColumn, MiniGallery } from "@/components/sections";
import { Clock, Phone, Users, ArrowRight, FileText, Wine, Leaf, Sun, UtensilsCrossed, Coffee, Heart, Check } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const menuPDFs = {
  breakfast: "https://www.opduin.nl/upload/files/opduin_ontbijtkaart.pdf",
  lunch: "https://www.opduin.nl/upload/files/opduin_lunchkaart_A5%20(2).pdf",
  dinner: "https://www.opduin.nl/upload/files/opduin_menukaart%20EN%20vanaf%2012%20dec.pdf",
};

const localIngredients = [
  {
    icon: UtensilsCrossed,
    title: "Texel & Wadden Products",
    description: "As many products as possible from Texel and other Wadden Sea regions",
  },
  {
    icon: Leaf,
    title: "Organic & Seasonal",
    description: "Organic meat and seasonal vegetables from local farms",
  },
  {
    icon: Wine,
    title: "Day-fresh Fish",
    description: "The sea provides us with day-fresh fish and shellfish",
  },
];

const diningOptions = [
  {
    title: "Breakfast",
    time: "7:00 – 10:30",
    description: "Extensive buffet for hotel guests. Fresh breads, local cheeses, eggs to order, and island honey.",
    note: "Included for hotel guests",
    icon: Coffee,
    menuUrl: menuPDFs.breakfast,
  },
  {
    title: "Lunch",
    time: "12:00 – 14:30",
    description: "Light dishes and sandwiches. Perfect after a morning beach walk or cycle tour.",
    note: "Open to all",
    icon: Sun,
    menuUrl: menuPDFs.lunch,
  },
  {
    title: "Dinner",
    time: "18:00 – 22:00",
    description: "Multi-course dining experience. Choose 3 to 6 courses showcasing the island's finest.",
    note: "Reservations recommended",
    icon: UtensilsCrossed,
    menuUrl: menuPDFs.dinner,
  },
];

const galleryImages = [
  "/restaurant/restaurant-opduin-600x450.jpg",
  "/restaurant/lunchen-in-opduin-600x450_2.jpg",
  "/restaurant/slow-food-chefs-alliantie-600x450_1.jpg",
  "/restaurant/tafel-reserveren-600x450_2.jpg",
  "/restaurant/restaurant-opduin-600x450.jpg",
  "/restaurant/lunchen-in-opduin-600x450_2.jpg",
];

export default function RestaurantPage() {
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
      <Header />

      {/* Floating Reserve Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showFloatingCTA ? 0 : 100, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <Link
          href="/book?type=restaurant"
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white shadow-xl rounded-full text-sm font-medium"
        >
          Reserve a Table
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHero
          label="Restaurant of Opduin"
          title="Wadden Gastronomy"
          description="Good food with as many products as possible from Texel and other Wadden Sea regions. If this is not possible, we look for a sustainable and organic alternative."
          backgroundImage="/restaurant/restaurant-opduin-600x450.jpg"
          youtubeId="8Raur-TG4_A"
          primaryAction={{
            label: "Reserve a Table",
            href: "/book?type=restaurant",
          }}
          infoStrip={{
            items: [
              { icon: Clock, label: "Lunch", value: "12:00–14:30" },
              { icon: Clock, label: "Dinner", value: "18:00–22:00" },
            ],
            trailingContent: (
              <Link
                href="/book?type=restaurant"
                className="hidden md:inline-flex items-center gap-2 text-shell hover:text-white transition-colors text-sm"
              >
                Reserve now
                <ArrowRight size={14} />
              </Link>
            ),
          }}
        />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Restaurant" }]} />
          </div>
        </section>

        {/* Philosophy / Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  In the Dunes
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  Fresh and homemade
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                  In the middle of the dunes of De Koog we made the restaurant and terrace.
                  Good food, extensive choice, as many local products as possible and always
                  fresh and homemade.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  Our chefs source the freshest and most sustainable ingredients from the region,
                  from the Wadden Islands to the coastline from Den Oever to Delfzijl.
                  The sea provides us with day-fresh fish and shellfish, while the land provides
                  organic meat and seasonal vegetables. Each product is carefully selected to
                  reflect the rich biodiversity and flavor of the Wadden region.
                </p>

                {/* Dog note */}
                <div className="flex items-start gap-3 p-4 bg-sand-50 border-l-2 border-shell">
                  <Heart className="w-5 h-5 text-shell mt-0.5" />
                  <div>
                    <p className="font-medium text-ink mb-1">Dog-free Restaurant</p>
                    <p className="text-sm text-neutral-600">
                      The restaurant is completely dog-free. Would you like to have a bite to eat
                      with your dog? Then you are welcome in our bar for a simple 2-course menu.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="/restaurant/slow-food-chefs-alliantie-600x450_1.jpg"
                  alt="Slow Food Chefs Alliance - Restaurant Opduin"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Local Ingredients */}
        <FeatureGrid
          label="Local Sourcing"
          title="Ingredients with a story"
          items={localIngredients}
        />

        {/* Dining Options */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                When to Dine
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink">
                Three moments, one kitchen
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diningOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.article
                    key={option.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                    className="group bg-white p-8"
                  >
                    <Icon size={28} className="text-shell mb-6" />
                    <p className="text-shell text-sm font-medium tracking-wide mb-2">{option.time}</p>
                    <h3 className="font-display text-2xl text-ink mb-4">{option.title}</h3>
                    <p className="text-neutral-600 leading-relaxed mb-6">{option.description}</p>
                    <p className="text-sm text-neutral-500 flex items-center gap-2 mb-6">
                      <Check size={14} className="text-shell" />
                      {option.note}
                    </p>
                    {option.menuUrl && (
                      <a
                        href={option.menuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm group/link"
                      >
                        <FileText size={14} />
                        View Menu
                        <ArrowRight size={14} className="opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                      </a>
                    )}
                  </motion.article>
                );
              })}
            </div>

            {/* Reserve CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <p className="text-neutral-600 text-lg mb-6">
                Reserve your table for lunch or dinner. Also for non-hotel guests.
              </p>
              <Link
                href="/book?type=restaurant"
                className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
              >
                Reserve a Table
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Quick Info Strip */}
        <section className="py-6 bg-sand-50 border-y border-sand-200">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-shell" />
                <span className="text-neutral-500">Dietary</span>
                <span className="text-ink font-medium">Vegan, GF options</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-shell" />
                <span className="text-neutral-500">Terrace</span>
                <span className="text-ink font-medium">Open to all</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-shell" />
                <span className="text-neutral-500">Capacity</span>
                <span className="text-ink font-medium">70 guests</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <MiniGallery
          title="Restaurant Gallery"
          images={galleryImages}
          columns={3}
          background="sand-100"
        />

        {/* Private Dining CTA */}
        <SectionCTA
          icon={Users}
          title="Private Dining & Events"
          description="Celebrate special occasions in our private dining room. Customized menus, attentive service, and views of the dunes. Perfect for birthdays, anniversaries, or intimate gatherings."
          actions={[
            { label: "Enquire Now", href: "/meetings" },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
