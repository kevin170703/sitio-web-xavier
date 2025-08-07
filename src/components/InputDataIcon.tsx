"use client";

import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

interface InputDataIconProps {
  icon: React.ReactNode;
  label?: string;
  onChange?: (date: Date | null) => void; // <- nueva prop
  initialDate?: Date | null;
}

export default function InputDataIcon({
  icon,
  label = "Check in",
  onChange,
  initialDate = new Date(),
}: InputDataIconProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const datepickerRef = useRef<any>(null);

  const handleClick = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(true);
    }
  };

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange?.(date); // Llamamos al callback si existe
  };

  return (
    <div className="text-start w-max">
      <div
        className="flex justify-center items-center gap-2 cursor-pointer"
        onClick={handleClick}
      >
        <div className="size-8 text-primary">{icon}</div>
        <p className="text-lg font-medium">{label}</p>
      </div>

      <p className="text-sm">
        {selectedDate ? format(selectedDate, "dd MMM yyyy") : "Select date"}
      </p>

      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        ref={datepickerRef}
        className="hidden"
      />
    </div>
  );
}
