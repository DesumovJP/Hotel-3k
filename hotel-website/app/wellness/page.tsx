"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { Heading, Text, Label, Button } from "@/components/atoms";
import { SplitText, MagneticWrapper } from "@/components/animations";
import { wellnessCategories, facilities } from "@/lib/data";
import { Waves, Flame, Cloud, Armchair, Dumbbell, Sun, Clock } from "lucide-react";
import { fadeInUp, staggerContainer, defaultViewport, easeOutExpo } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  waves: <Waves size={24} />,
  flame: <Flame size={24} />,
  cloud: <Cloud size={24} />,
  armchair: <Armchair size={24} />,
  dumbbell: <Dumbbell size={24} />,
  sun: <Sun size={24} />,
};

export default function WellnessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.6]);

  return (
    <>
      <Header />

      <main>
        {/* Hero with Parallax */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070"
              alt="Wellness spa"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />

          <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <Label className="!text-white/70 mb-4">Wellness</Label>
              </motion.div>

              <div className="overflow-hidden mb-4">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                >
                  <Heading as="h1" className="!text-white">
                    <SplitText type="words" animation="fadeUp" staggerDelay={0.05} delay={0.2}>
                      Space to Breathe
                    </SplitText>
                  </Heading>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
              >
                <Text size="lg" className="!text-white/80">
                  Our spa is a place of quiet restoration. Come as you are.
                  Leave renewed.
                </Text>
              </motion.div>
            </div>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: easeOutExpo }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              <Text size="lg" muted className="leading-relaxed">
                The Opduin Spa draws its inspiration from the island itself — the
                mineral-rich waters of the Wadden Sea, the salt air that refreshes
                and heals, the quiet rhythm of nature. Here, time slows. Tensions
                dissolve. You reconnect with yourself.
              </Text>
            </motion.div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 md:py-24 bg-[var(--color-mist)]">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeInUp}>
                <Label className="mb-4">Facilities</Label>
              </motion.div>
              <motion.div variants={fadeInUp} className="overflow-hidden">
                <Heading as="h2">Our Spaces</Heading>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {facilities.map((facility, index) => (
                <motion.div
                  key={facility.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-[var(--color-sea)] group-hover:bg-[var(--color-sea)] group-hover:text-white transition-colors duration-300"
                  >
                    {iconMap[facility.icon]}
                  </motion.div>
                  <Text className="font-medium mb-1">{facility.name}</Text>
                  <Text size="xs" muted>{facility.description}</Text>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeOutExpo }}
              className="mt-12 p-6 bg-white text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={16} className="text-[var(--color-slate)]" />
                <Text className="font-medium">Spa Hours</Text>
              </div>
              <Text muted>Daily 7:00 – 21:00 | Pool & Fitness: 24/7 for hotel guests</Text>
            </motion.div>
          </div>
        </section>

        {/* Treatments */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeInUp}>
                <Label className="mb-4">Treatments</Label>
              </motion.div>
              <motion.div variants={fadeInUp} className="overflow-hidden">
                <Heading as="h2" className="mb-4">Spa Menu</Heading>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Text muted>
                  All treatments use natural products inspired by the sea and island botanicals.
                </Text>
              </motion.div>
            </motion.div>

            <div className="space-y-16">
              {wellnessCategories.map((category, catIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: catIndex * 0.1, ease: easeOutExpo }}
                >
                  <Heading as="h4" className="mb-2">{category.title}</Heading>
                  <Text muted className="mb-8">{category.description}</Text>

                  <div className="space-y-4">
                    {category.treatments.map((treatment, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: easeOutExpo }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 border-b border-[var(--color-cloud)] last:border-0 group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Text className="font-medium group-hover:text-[var(--color-sea)] transition-colors">
                              {treatment.name}
                            </Text>
                            <Text size="xs" muted className="px-2 py-0.5 bg-[var(--color-mist)] rounded">
                              {treatment.duration}
                            </Text>
                          </div>
                          <Text size="sm" muted className="mt-1">
                            {treatment.description}
                          </Text>
                        </div>
                        <Text className="font-medium flex-shrink-0">
                          {treatment.price}
                        </Text>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
              className="mt-12 text-center"
            >
              <MagneticWrapper strength={0.15}>
                <Link href="/book?type=spa">
                  <Button size="lg">
                    Book a Treatment
                  </Button>
                </Link>
              </MagneticWrapper>
              <Text size="sm" muted className="mt-4">
                For spa packages and special requests, please contact us directly.
              </Text>
            </motion.div>
          </div>
        </section>

        {/* Image Band with Parallax */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: easeOutExpo }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070"
              alt="Spa treatment"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
