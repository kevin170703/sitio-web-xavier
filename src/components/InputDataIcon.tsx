"use client";

import { IconCalendarPlus, IconCalendarWeek } from "@tabler/icons-react";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputDataIconProps {
  onChange?: (date: Date | null) => void;
  initialDate?: Date | null;
  value?: Date | null; // <-- nuevo prop
  daysToAdd?: number;
  icon: React.ReactNode;
  text: string;
}

export default function InputDataIcon({
  onChange,
  initialDate = new Date(),
  value,
  daysToAdd = 0,
  icon,
  text,
}: InputDataIconProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ?? initialDate
  );

  const datepickerRef = useRef<InstanceType<typeof DatePicker> | null>(null);

  // Sincronizar cuando value cambie
  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
    }
  }, [value]);

  const handleClick = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(true);
    }
  };

  const getMinDate = (): Date => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + daysToAdd);
    return date;
  };

  const handleChange = (date: Date | null) => {
    if (!date) {
      setSelectedDate(null);
      onChange?.(null);
      return;
    }

    const minDate = getMinDate();

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    if (selected < minDate) {
      setSelectedDate(minDate);
      onChange?.(minDate);
    } else {
      setSelectedDate(date);
      onChange?.(date);
    }
  };

  return (
    <div
      className="w-[140px] flex  justify-center items-center relative gap-3 max-lg:border border-black/40 max-lg:py-2 max-lg:w-[160px] rounded-xl"
      onClick={handleClick}
    >
      <div className="size-8 text-black opacity-30">{icon}</div>
      <div
        className="flex flex-col justify-center items-start cursor-pointer "
        onClick={handleClick}
      >
        <p className="text-base">{text}</p>
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          ref={datepickerRef}
          dateFormat="yyyy/MM/dd"
          placeholderText="aaaa/mm/dd"
          className="outline-none w-[95px] text-lg font-medium -mt-1"
          calendarClassName="z-50"
          minDate={getMinDate()}
        />
      </div>
    </div>
  );
}
