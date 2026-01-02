import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { Heading, Text, Label, Button } from "@/components/atoms";
import { RoomGallery } from "@/components/molecules";
import { rooms, getRoomBySlug } from "@/lib/data";
import { Users, Maximize, Bed, Eye, Check, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    return { title: "Room Not Found" };
  }

  return {
    title: `${room.name} | Grand Hotel Opduin`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return (
    <>
      <Header />

      <main>
        {/* Hero Image */}
        <section className="relative h-[60vh] min-h-[400px]">
          <Image
            src={room.image}
            alt={room.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Back Link */}
          <div className="absolute top-24 left-6 md:left-12 lg:left-24 z-10">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">All Rooms</span>
            </Link>
          </div>
        </section>

        {/* Room Info */}
        <section className="py-12 md:py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline
              items={[
                { label: "Rooms & Suites", href: "/rooms" },
                { label: room.name }
              ]}
              className="mb-8"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Label className="mb-4">{room.view} View</Label>
                <Heading as="h1" className="mb-4">
                  {room.name}
                </Heading>
                <Text size="lg" className="text-[var(--color-sea)] mb-8">
                  {room.tagline}
                </Text>

                <Text muted className="mb-8 leading-relaxed">
                  {room.longDescription}
                </Text>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-[var(--color-cloud)]">
                  <div className="text-center">
                    <Users size={24} className="mx-auto mb-2 text-[var(--color-slate)]" />
                    <Text size="sm" muted>Up to {room.maxGuests}</Text>
                    <Text size="xs" muted>Guests</Text>
                  </div>
                  <div className="text-center">
                    <Maximize size={24} className="mx-auto mb-2 text-[var(--color-slate)]" />
                    <Text size="sm" muted>{room.size} m²</Text>
                    <Text size="xs" muted>Size</Text>
                  </div>
                  <div className="text-center">
                    <Bed size={24} className="mx-auto mb-2 text-[var(--color-slate)]" />
                    <Text size="sm" muted>{room.bedType}</Text>
                    <Text size="xs" muted>Bed</Text>
                  </div>
                  <div className="text-center">
                    <Eye size={24} className="mx-auto mb-2 text-[var(--color-slate)]" />
                    <Text size="sm" muted>{room.view}</Text>
                    <Text size="xs" muted>View</Text>
                  </div>
                </div>

                {/* Features */}
                <div className="py-8">
                  <Heading as="h4" className="mb-6">Features</Heading>
                  <div className="grid grid-cols-2 gap-3">
                    {room.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check size={16} className="text-[var(--color-sea)]" />
                        <Text size="sm" muted>{feature}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="py-8 border-t border-[var(--color-cloud)]">
                  <Heading as="h4" className="mb-6">Amenities</Heading>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3">
                        <Check size={16} className="text-[var(--color-stone)]" />
                        <Text size="sm" muted>{amenity}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Booking Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-[var(--color-mist)] p-8">
                  <Text muted className="text-sm mb-2">From</Text>
                  <div className="flex items-baseline gap-2 mb-6">
                    <Heading as="h3">€{room.price}</Heading>
                    <Text muted>/ night</Text>
                  </div>

                  <Link href={`/book?room=${room.slug}`} className="block mb-4">
                    <Button fullWidth size="lg">
                      Reserve This Room
                    </Button>
                  </Link>

                  <Text size="xs" muted className="text-center">
                    Free cancellation up to 48 hours before arrival
                  </Text>

                  <div className="mt-8 pt-8 border-t border-[var(--color-fog)]">
                    <Text size="sm" muted className="mb-4">
                      Need assistance?
                    </Text>
                    <a
                      href="tel:+31222317445"
                      className="block text-[var(--color-ink)] hover:text-[var(--color-sea)] transition-colors"
                    >
                      +31 (0)222 317 445
                    </a>
                    <a
                      href="mailto:reservations@opduin.nl"
                      className="block text-[var(--color-ink)] hover:text-[var(--color-sea)] transition-colors mt-2"
                    >
                      reservations@opduin.nl
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <RoomGallery images={room.gallery} roomName={room.name} />
      </main>

      <Footer />
    </>
  );
}
