import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/organisms";
import { Heading, Text, Label, Button } from "@/components/atoms";
import { rooms } from "@/lib/data";
import { ArrowRight, Users, Maximize } from "lucide-react";

export const metadata: Metadata = {
  title: "Rooms & Suites | Grand Hotel Opduin",
  description: "Discover our collection of rooms and suites, each designed for stillness with views of dunes, sea, or gardens.",
};

export default function RoomsPage() {
  return (
    <>
      <Header variant="dark" />

      <main>
        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-[var(--color-mist)]">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <Label className="mb-6">Accommodations</Label>
            <Heading as="h1" className="mb-6 max-w-3xl">
              Rooms & Suites
            </Heading>
            <Text size="lg" muted className="max-w-2xl">
              Each of our rooms is a sanctuary designed for rest. Natural materials,
              considered details, and views that ground you in the beauty of Texel.
            </Text>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-12 md:py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="space-y-12 md:space-y-16">
              {rooms.map((room, index) => (
                <article
                  key={room.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <Link
                    href={`/rooms/${room.slug}`}
                    className={`relative aspect-[4/3] overflow-hidden bg-[var(--color-mist)] group ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <Text muted className="text-sm mb-4">
                      From €{room.price} / night
                    </Text>

                    <Heading as="h2" className="mb-4">
                      {room.name}
                    </Heading>

                    <Text muted className="mb-6">
                      {room.description}
                    </Text>

                    <div className="flex items-center gap-6 mb-8 text-[var(--color-slate)]">
                      <div className="flex items-center gap-2">
                        <Users size={18} />
                        <Text size="sm" muted>Up to {room.maxGuests} guests</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize size={18} />
                        <Text size="sm" muted>{room.size} m²</Text>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link href={`/rooms/${room.slug}`}>
                        <Button variant="secondary" size="md">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/book?room=${room.slug}`}>
                        <Button size="md">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-[var(--color-mist)]">
          <div className="px-6 md:px-12 lg:px-24 max-w-3xl mx-auto text-center">
            <Heading as="h3" className="mb-6">
              Need help choosing?
            </Heading>
            <Text muted className="mb-8">
              Our team is here to help you find the perfect room for your stay.
              Contact us for personalized recommendations.
            </Text>
            <Link href="/book">
              <Button size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
