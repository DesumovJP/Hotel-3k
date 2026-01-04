import { notFound } from "next/navigation";
import { getOfferBySlug, getAllOfferSlugs, offers } from "@/lib/data/offers";
import { OfferDetailClient } from "./OfferDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllOfferSlugs().map((slug) => ({ slug }));
}

export default async function OfferDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);

  if (!offer) {
    notFound();
  }

  const otherOffers = offers.filter((o) => o.slug !== slug).slice(0, 3);

  return <OfferDetailClient offer={offer} otherOffers={otherOffers} />;
}
