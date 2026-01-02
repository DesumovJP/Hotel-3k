"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { fadeInUp, defaultViewport } from "@/lib/motion";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ScheduleCheckProps {
  title?: string;
  subtitle?: string;
  availableSlots?: Record<string, TimeSlot[]>;
  onSelectSlot?: (date: string, time: string) => void;
  className?: string;
}

// Generate dates for the next 7 days
function generateDates(): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
}

// Default time slots
const defaultTimeSlots: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "14:00", available: true },
  { time: "15:00", available: false },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
];

function formatDate(dateString: string): { day: string; date: string; month: string } {
  const date = new Date(dateString);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return {
    day: days[date.getDay()],
    date: date.getDate().toString(),
    month: months[date.getMonth()],
  };
}

export function ScheduleCheck({
  title = "Check Availability",
  subtitle = "Select a date and time for your treatment",
  availableSlots,
  onSelectSlot,
  className,
}: ScheduleCheckProps) {
  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState<string>(dates[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const slots = availableSlots?.[selectedDate] || defaultTimeSlots;

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSelectSlot?.(selectedDate, selectedTime);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeInUp}
      className={cn("bg-neutral rounded-2xl p-8 shadow-elevation-2", className)}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
          <Calendar className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h3 className="font-display text-lg text-ink">{title}</h3>
          {subtitle && <p className="text-ink-500 text-body-sm">{subtitle}</p>}
        </div>
      </div>

      {/* Date selector */}
      <div className="mb-6">
        <p className="text-ink-600 text-body-sm font-medium mb-3">Select Date</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((dateStr) => {
            const { day, date, month } = formatDate(dateStr);
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === dates[0];

            return (
              <button
                key={dateStr}
                onClick={() => {
                  setSelectedDate(dateStr);
                  setSelectedTime(null);
                }}
                className={cn(
                  "flex-shrink-0 w-16 py-3 rounded-xl text-center transition-colors",
                  isSelected
                    ? "bg-deepsea text-neutral"
                    : "bg-sand-200 text-ink hover:bg-sand-300"
                )}
              >
                <span className="block text-xs opacity-70">{day}</span>
                <span className="block text-lg font-display">{date}</span>
                <span className="block text-xs opacity-70">
                  {isToday ? "Today" : month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="mb-6">
        <p className="text-ink-600 text-body-sm font-medium mb-3">Available Times</p>
        <div className="grid grid-cols-4 gap-2">
          {slots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => slot.available && setSelectedTime(slot.time)}
              disabled={!slot.available}
              className={cn(
                "py-3 rounded-lg text-center text-body-sm transition-colors min-h-[44px] flex items-center justify-center gap-1",
                !slot.available && "opacity-40 cursor-not-allowed bg-sand-100 text-ink-400",
                slot.available && selectedTime !== slot.time && "bg-sand-200 text-ink hover:bg-sand-300",
                selectedTime === slot.time && "bg-gold text-white"
              )}
            >
              <Clock className="w-3.5 h-3.5" />
              {slot.time}
              {!slot.available && <X className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-xs text-ink-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-sand-200" />
          Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-sand-100 opacity-40" />
          Booked
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-gold" />
          Selected
        </span>
      </div>

      {/* Confirm button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={!selectedTime}
        onClick={handleConfirm}
      >
        {selectedTime ? (
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Confirm {formatDate(selectedDate).day} at {selectedTime}
          </span>
        ) : (
          "Select a time slot"
        )}
      </Button>
    </motion.section>
  );
}
