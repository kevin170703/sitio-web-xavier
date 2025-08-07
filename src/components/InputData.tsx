"use client";

import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { IconCalendarWeek } from "@tabler/icons-react";
import "react-datepicker/dist/react-datepicker.css";

export default function InputData() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<any>(null);

  const openCalendar = () => {
    datePickerRef.current?.setOpen(true);
  };

  return (
    <div className="relative w-full border border-black/10 rounded-xl outline-none px-4 py-2.5">
      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/aaaa"
        className="outline-none text-black/50 focus:text-black"
        calendarClassName="z-50"
      />
      <button
        type="button"
        onClick={openCalendar}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-black/30"
      >
        <IconCalendarWeek size={18} />
      </button>
    </div>
  );
}
