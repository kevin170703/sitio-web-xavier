"use client";

import { IconCalendarWeek } from "@tabler/icons-react";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputDataIconProps {
  onChange?: (date: Date | null) => void;
  initialDate?: Date | null;
  value?: Date | null; // <-- nuevo prop
  daysToAdd?: number;
}

export default function InputData({
  onChange,
  initialDate = new Date(),
  value,
  daysToAdd = 0,
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
    <div className="relative w-full border border-black/10 rounded-xl outline-none px-4 py-2.5">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        ref={datepickerRef}
        dateFormat="yyyy/MM/dd"
        placeholderText="aaaa/mm/dd"
        className="outline-none text-black/50 focus:text-black"
        calendarClassName="z-50"
        minDate={getMinDate()}
      />
      <button
        type="button"
        onClick={handleClick}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-black/30"
      >
        <IconCalendarWeek size={18} />
      </button>
    </div>
  );
}
