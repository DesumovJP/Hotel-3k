"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryModal } from "./GalleryModal";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt?: string;
  columns?: 2 | 3 | 4;
  aspectRatio?: "square" | "4/3" | "3/2" | "16/9";
  className?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
};

const columnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

export function ImageGallery({
  images,
  alt = "Gallery image",
  columns = 4,
  aspectRatio = "square",
  className,
}: ImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const galleryImages = images.map((src, index) => ({
    src,
    alt: `${alt} ${index + 1}`,
  }));

  return (
    <>
      <div className={cn("grid gap-4", columnClasses[columns], className)}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              "relative overflow-hidden bg-[var(--color-mist)] cursor-pointer group",
              aspectRatioClasses[aspectRatio]
            )}
          >
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              sizes={`(max-width: 768px) 50vw, ${100 / columns}vw`}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <GalleryModal
        images={galleryImages}
        initialIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
