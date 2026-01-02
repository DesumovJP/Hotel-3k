"use client";

import { useState } from "react";
import Image from "next/image";
import { Heading } from "@/components/atoms";
import { GalleryModal } from "./GalleryModal";

interface RoomGalleryProps {
  images: string[];
  roomName: string;
}

export function RoomGallery({ images, roomName }: RoomGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const galleryImages = images.map((src, index) => ({
    src,
    alt: `${roomName} - Image ${index + 1}`,
  }));

  return (
    <>
      <section className="py-16 md:py-24 bg-[var(--color-mist)]">
        <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <Heading as="h3" className="mb-10">Gallery</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cloud)] cursor-pointer group"
              >
                <Image
                  src={image}
                  alt={`${roomName} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <GalleryModal
        images={galleryImages}
        initialIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
