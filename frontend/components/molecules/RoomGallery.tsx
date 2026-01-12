"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heading } from "@/components/atoms";
import { GalleryModal } from "./GalleryModal";
import { easeOutExpo } from "@/lib/motion";

interface RoomGalleryProps {
  images: string[];
  roomName: string;
}

export function RoomGallery({ images, roomName }: RoomGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ensure gallery displays a number of images divisible by 3 for clean grid
  const displayCount = Math.floor(images.length / 3) * 3 || 3;
  const displayImages = images.slice(0, Math.min(displayCount, images.length));

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const galleryImages = displayImages.map((src, index) => ({
    src,
    alt: `${roomName} - Image ${index + 1}`,
  }));

  return (
    <>
      <section className="py-16 md:py-24 bg-sand-100">
        <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <Heading as="h3" className="mb-10">Gallery</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayImages.map((image, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: easeOutExpo }}
                whileHover={{ y: -4 }}
                onClick={() => handleImageClick(index)}
                className="relative aspect-[4/3] overflow-hidden bg-sand-200 cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-500 ease-out"
              >
                <Image
                  src={image}
                  alt={`${roomName} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Elegant overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-500" />

                {/* Centered text panel */}
                <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {/* Decorative line above */}
                    <div className="w-8 h-px bg-white/60 mx-auto mb-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />

                    <p className="text-white text-lg md:text-xl lg:text-2xl font-display italic leading-snug">
                      {roomName}
                    </p>
                    <p className="text-white/50 text-sm tracking-widest uppercase mt-3">
                      {index + 1} / {displayImages.length}
                    </p>

                    {/* Decorative line below */}
                    <div className="w-8 h-px bg-white/60 mx-auto mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                  </div>
                </div>
              </motion.button>
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
