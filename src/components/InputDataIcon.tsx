"use client";

import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
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

  const datepickerRef = useRef<InstanceType<typeof DatePicker> | null>(null);

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
    <div className="w-max flex flex-col justify-center items-start relative">
      <div
        className="flex justify-center items-center gap-2 cursor-pointer "
        onClick={handleClick}
      >
        <div className="size-8 text-primary">{icon}</div>
        <p className="text-lg font-medium">{label}</p>
      </div>

      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        ref={datepickerRef}
        dateFormat="dd MMM yyyy" // <--- esta línea cambia el formato mostrado
        className="text-sm outline-none cursor-pointer "
      />
    </div>
  );
}
