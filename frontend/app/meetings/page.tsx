"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionHero, SectionCTA, SectionTwoColumn, MiniGallery, SectionIntro, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { Users, Mail, ArrowRight, Check } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const activities = [
  "Oyster mudflat hiking",
  "Nature excursions",
  "Flying above the island",
  "Surfing",
  "Cycling tours",
  "Seal watching",
];

// Real meeting rooms with actual capacities and descriptions
const meetingRooms = [
  {
    name: "Slufterzaal",
    dimensions: "8 × 6m",
    area: "48m²",
    carre: 22,
    theatre: 42,
    ushape: 18,
    description: "Suitable for 2 to 42 people. Can be linked with Muyzaal and Bollekamer to form 1 large room for up to 156 people, or with Muyzaal alone for up to 110 people.",
    image: "/meetings/slufterzaal-600x450.jpg",
  },
  {
    name: "Muyzaal",
    dimensions: "7 × 7m",
    area: "49m²",
    carre: 26,
    theatre: 57,
    ushape: 20,
    description: "Suitable for 2 to 57 people. Can be linked with Slufterzaal and Bollekamer to form 1 large room for up to 156 people, or with Slufterzaal alone for up to 110 people.",
    image: "/meetings/muyzaal-600x450.jpg",
  },
  {
    name: "Bollekamer",
    dimensions: "9 × 6m",
    area: "54m²",
    carre: 20,
    theatre: 48,
    ushape: 18,
    description: "Suitable for 2 to 48 people. Can be linked with Slufterzaal and Muyzaal to form 1 large room for up to 156 people.",
    image: "/meetings/bollekamer-600x450.jpg",
  },
  {
    name: "Slufter + Muyzaal",
    dimensions: "13 × 6.5m",
    area: "84m²",
    carre: 42,
    theatre: 110,
    ushape: 36,
    description: "Combined space suitable for 20 to 110 people.",
    image: "/meetings/slufter-muyzaal-combinatie-600x450.jpg",
  },
  {
    name: "All three rooms",
    dimensions: "24 × 6.5m",
    area: "156m²",
    carre: 56,
    theatre: 140,
    ushape: 50,
    description: "Maximum configuration for up to 156 people in various setups.",
    image: "/meetings/vergaderzalen-600x450.jpg",
  },
];


const galleryImages = [
  "/meetings/vergaderzalen-600x450.jpg",
  "/meetings/slufterzaal-600x450.jpg",
  "/meetings/muyzaal-600x450.jpg",
  "/meetings/bollekamer-600x450.jpg",
  "/meetings/slufter-muyzaal-combinatie-600x450.jpg",
  "/meetings/vergaderarrangementen-600x450.jpg",
  "/meetings/teambuildingactiviteiten-600x450.jpg",
  "/meetings/een-feestje-op-texel-600x450.jpg",
  "/meetings/trouwen-op-texel-600x450.jpg",
];

export default function MeetingsPage() {
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
          href="mailto:banqueting@opduin.nl"
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white shadow-xl rounded-full text-sm font-medium"
        >
          <Mail size={16} />
          Request Proposal
        </a>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHero
          label="Meetings & Events"
          title="Meetings"
          tagline="Sincere attention for each other"
          description="You will organize a meeting that no one will forget. And that's what matters."
          backgroundImage="/meetings/image-700x700_1.jpg"
          youtubeId="APJyGnhfits"
          primaryAction={{
            label: "Request Proposal",
            href: "mailto:banqueting@opduin.nl",
            icon: Mail,
          }}
          infoStrip={{
            items: [
              { icon: Users, value: "2 to 200 guests" },
              { icon: Check, value: "Full-service catering" },
              { icon: Check, value: "Dedicated events team" },
            ],
            trailingContent: (
              <span className="hidden md:block text-neutral-500 text-sm">
                Response within 24 hours
              </span>
            ),
          }}
        />

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Meetings & Events" }]} />
          </div>
        </section>

        {/* Introduction */}
        <SectionIntro
          label="Conference & Events"
          title="Meetings that inspire"
          lead="An original place where participants are completely isolated from their normal activities. But still easily accessible. An endless variety of professionally organized activities in and around the location."
          paragraphs={[
            "Intimate enough for a small gathering, but also well equipped for a meeting of 200 participants. Meetings on Texel are always successful.",
            "With a well chosen destination and a good program participants get involved and excited. The atmosphere and comfort in combination with a flexible organization give everyone the chance to grow.",
          ]}
          image="/meetings/vergaderzalen-600x450.jpg"
          imageAlt="Meeting room at Grand Hotel Opduin"
          highlight={{
            icon: Users,
            title: "Flexible Capacity",
            description: "From board meetings of 10 people to conferences of 200 participants - we adapt to your needs.",
          }}
          padding="lg"
        />

        {/* Blend: white -> sand */}
        <SectionBlend from="white" to="sand" height="md" />

        {/* Teambuilding Activities */}
        <SectionTwoColumn
          title="Teambuilding Activities"
          content={[
            "Oyster mudflat hiking, nature excursions, flying above the island, surfing... So many activities to let your guests experience something special between meetings.",
            "We are happy to help you find a suitable activity and arrange everything for you.",
          ]}
          image="/meetings/teambuildingactiviteiten-600x450.jpg"
          imageAlt="Teambuilding activities on Texel"
          imagePosition="left"
          background="sand"
          tags={activities}
          ctaLink="mailto:banqueting@opduin.nl"
          ctaText="Ask about activities"
        />

        {/* Blend: sand -> white */}
        <SectionBlend from="sand" to="white" height="md" />

        {/* A Texel Party */}
        <SectionTwoColumn
          title="A Texel Party"
          content={[
            "A great party is well organized and at the same time gives your guests the opportunity to completely relax. When you invite guests to the island, the fun already begins — it's like going abroad, but even better.",
            "Texel offers a world of possibilities. Food and drinks grown by local neighbors, fierce nature, adventurous sports, high-standing art and culture, wellness, and unique skies on endless beaches.",
            "Weddings, anniversaries, family gatherings — your guests don't just stop by, they enjoy a real happening.",
          ]}
          image="/meetings/een-feestje-op-texel-600x450.jpg"
          imageAlt="Celebrations on Texel"
          imagePosition="right"
          background="white"
          ctaLink="mailto:banqueting@opduin.nl"
          ctaText="Plan your celebration"
        />

        {/* Blend: white -> sand-100 */}
        <SectionBlend from="white" to="sand-100" height="md" />

        {/* Weddings */}
        <section className="py-16 md:py-20 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/meetings/trouwen-op-texel-600x450.jpg"
                  alt="Wedding on Texel"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                  Getting Married on Texel
                </h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Opduin is an official wedding location. Ideal for small weddings. You can get married
                  in one of our rooms or on the beach and afterwards a relaxed dinner with the whole group.
                </p>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  To ensure that your wedding day is arranged according to your wishes, we work together
                  with Sophie of Trouwen Texel. She will organize your wedding (or part of it) with heart
                  and soul, so that you can enjoy this special day carefree.
                </p>
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="text-sm font-medium text-ink mb-2">Contact the Texel wedding planner Sophie:</p>
                  <div className="text-sm text-neutral-600 space-y-1">
                    <p><a href="https://www.trouwen-texel.nl" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-shell">www.trouwen-texel.nl</a></p>
                    <p><a href="mailto:info@trouwentexel.com" className="text-navy hover:text-shell">info@trouwentexel.com</a></p>
                    <p><a href="tel:+31657186156" className="text-navy hover:text-shell">06-57186156</a></p>
                  </div>
                </div>
                <a
                  href="mailto:banqueting@opduin.nl"
                  className="inline-flex items-center gap-2 text-navy font-medium hover:text-shell transition-colors"
                >
                  Contact our banqueting team
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Blend: sand-100 -> white */}
        <SectionBlend from="sand-100" to="white" height="md" />

        {/* Meeting Packages */}
        <SectionTwoColumn
          title="Meeting Packages"
          content={[
            "The complete package. You do not have to worry about anything, we make sure that you and your guests are taken care of in the right way.",
            "Including meeting room rental, lunches, dinner and treats. Prices depend on your wishes and the number of participants. We are happy to make an offer for you.",
            "Need extra ideas for an activity on Texel? Just give us a call and we will help you with some suggestions. We are also glad to take care of the organizational part.",
          ]}
          image="/meetings/vergaderarrangementen-600x450.jpg"
          imageAlt="Meeting packages"
          imagePosition="left"
          background="white"
          ctaLink="mailto:banqueting@opduin.nl"
          ctaText="Request a quote"
        />

        {/* Blend: white -> sand-100 */}
        <SectionBlend from="white" to="sand-100" height="md" />

        {/* Meeting Rooms */}
        <section className="py-16 md:py-24 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">
                Meeting Rooms
              </h2>
              <p className="text-neutral-600">
                All rooms on first floor with natural daylight. Beamer, screen, sound system & flipchart included.
              </p>
            </div>

            {/* Room Cards - first 3 individual rooms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {meetingRooms.slice(0, 3).map((room) => (
                <div key={room.name} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-ink mb-1">{room.name}</h3>
                    <p className="text-sm text-shell mb-2">{room.dimensions} • {room.area}</p>
                    <p className="text-sm text-neutral-600 mb-3">{room.description}</p>
                    <div className="flex gap-4 text-xs text-neutral-500">
                      <span>Carré: {room.carre}</span>
                      <span>Theatre: {room.theatre}</span>
                      <span>U: {room.ushape}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Capacity Table */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-display text-xl text-ink mb-4 text-center">Room Combinations</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-navy">
                      <th className="py-3 pr-4 text-sm font-medium text-ink">Configuration</th>
                      <th className="py-3 px-4 text-sm font-medium text-ink text-center hidden md:table-cell">Size</th>
                      <th className="py-3 px-4 text-sm font-medium text-ink text-center">Carré</th>
                      <th className="py-3 px-4 text-sm font-medium text-ink text-center">Theatre</th>
                      <th className="py-3 pl-4 text-sm font-medium text-ink text-center">U-Shape</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetingRooms.map((room) => (
                      <tr key={room.name} className="border-b border-neutral-200">
                        <td className="py-3 pr-4">
                          <span className="font-medium text-ink">{room.name}</span>
                          <span className="block text-xs text-neutral-500 md:hidden">{room.area}</span>
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-600 text-sm hidden md:table-cell">
                          {room.area}
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-700">{room.carre}</td>
                        <td className="py-3 px-4 text-center text-neutral-700">{room.theatre}</td>
                        <td className="py-3 pl-4 text-center text-neutral-700">{room.ushape}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-500 mt-4 text-center">
                Additional equipment available through third-party hire.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <MiniGallery
          title="Events at Opduin"
          images={galleryImages}
          columns={3}
          background="sand-100"
        />

        {/* Blend: sand-100 -> white */}
        <SectionBlend from="sand-100" to="white" height="md" />

        {/* Contact CTA */}
        <SectionCTA
          icon={Users}
          title="Contact Our Banqueting Team"
          description="Luuk and Esmee will help you plan your event. We respond within 24 hours."
          actions={[
            { label: "banqueting@opduin.nl", href: "mailto:banqueting@opduin.nl", icon: Mail },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
