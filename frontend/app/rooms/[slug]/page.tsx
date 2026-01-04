import { Metadata } from "next";
import { notFound } from "next/navigation";
import { rooms, getRoomBySlug } from "@/lib/data";
import { RoomDetailClient } from "./RoomDetailClient";

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

  const otherRooms = rooms.filter((r) => r.slug !== slug).slice(0, 3);

  return <RoomDetailClient room={room} otherRooms={otherRooms} />;
}
