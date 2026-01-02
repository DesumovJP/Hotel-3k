"use client";

import { motion } from "framer-motion";
import { Sun, Cloud, Wind, Thermometer, Calendar, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/motion";

interface WeatherData {
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "windy";
  windSpeed: number;
  humidity?: number;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location?: string;
}

interface LocalTip {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

interface TexelNowSectionProps {
  title?: string;
  subtitle?: string;
  weather?: WeatherData;
  events?: Event[];
  tips?: LocalTip[];
  className?: string;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: Cloud,
  windy: Wind,
};

export function TexelNowSection({
  title = "Texel Now",
  subtitle = "What's happening on the island",
  weather,
  events = [],
  tips = [],
  className,
}: TexelNowSectionProps) {
  const WeatherIcon = weather ? weatherIcons[weather.condition] : Sun;

  return (
    <section className={cn("py-section-md bg-deepsea text-neutral", className)}>
      <div className="px-gutter max-w-content-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-12">
            <span className="text-gold text-overline uppercase tracking-widest mb-2 block">
              Live from the Island
            </span>
            <h2 className="font-display text-display-lg text-neutral mb-4">{title}</h2>
            {subtitle && (
              <p className="text-neutral/70 text-body-lg max-w-xl mx-auto">{subtitle}</p>
            )}
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Weather Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-deepsea-700 rounded-2xl p-6 border border-deepsea-600"
            >
              <div className="flex items-center gap-2 mb-4">
                <Thermometer className="w-5 h-5 text-gold" />
                <h3 className="font-display text-lg text-neutral">Current Weather</h3>
              </div>

              {weather ? (
                <div className="flex items-center gap-4">
                  <WeatherIcon className="w-16 h-16 text-gold" />
                  <div>
                    <p className="font-display text-display-md text-neutral">
                      {weather.temperature}°C
                    </p>
                    <p className="text-neutral/60 text-body-sm capitalize">
                      {weather.condition}
                    </p>
                    <p className="text-neutral/60 text-body-sm flex items-center gap-1">
                      <Wind className="w-3 h-3" />
                      {weather.windSpeed} km/h
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Sun className="w-16 h-16 text-gold" />
                  <div>
                    <p className="font-display text-display-md text-neutral">12°C</p>
                    <p className="text-neutral/60 text-body-sm">Partly cloudy</p>
                  </div>
                </div>
              )}

              <p className="text-neutral/50 text-xs mt-4">
                Perfect weather for a beach walk
              </p>
            </motion.div>

            {/* Events Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-deepsea-700 rounded-2xl p-6 border border-deepsea-600"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gold" />
                <h3 className="font-display text-lg text-neutral">Upcoming Events</h3>
              </div>

              <ul className="space-y-3">
                {(events.length > 0 ? events : defaultEvents).slice(0, 3).map((event) => (
                  <li key={event.id} className="flex items-start gap-3">
                    <span className="text-gold text-body-sm font-medium min-w-[60px]">
                      {event.date}
                    </span>
                    <div>
                      <p className="text-neutral text-body-sm">{event.title}</p>
                      {event.location && (
                        <p className="text-neutral/50 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-deepsea-700 rounded-2xl p-6 border border-deepsea-600"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-gold" />
                <h3 className="font-display text-lg text-neutral">Local Tips</h3>
              </div>

              <ul className="space-y-3">
                {(tips.length > 0 ? tips : defaultTips).slice(0, 3).map((tip) => (
                  <li key={tip.id}>
                    <p className="text-neutral text-body-sm font-medium">{tip.title}</p>
                    <p className="text-neutral/60 text-xs">{tip.description}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const defaultEvents: Event[] = [
  { id: 1, title: "Texel Farmers Market", date: "Sat", location: "Den Burg" },
  { id: 2, title: "Seal Watching Tour", date: "Daily", location: "Oudeschild" },
  { id: 3, title: "Wine Tasting Evening", date: "Fri", location: "Hotel Opduin" },
];

export const defaultTips: LocalTip[] = [
  { id: 1, title: "Best sunset spot", description: "Paal 17 beach, 30 min before sunset" },
  { id: 2, title: "Local favorite", description: "Fresh fish at Kaap Noord restaurant" },
  { id: 3, title: "Hidden gem", description: "De Slufter nature reserve at low tide" },
];
