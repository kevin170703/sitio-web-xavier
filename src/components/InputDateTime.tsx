"use client";

import { IconCalendarWeek } from "@tabler/icons-react";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputDateTimeProps {
  onChange?: (date: Date | null) => void;
  initialDate?: Date | null;
  value?: Date | null;
  hoursToAdd?: number; // <-- en vez de daysToAdd
}

export default function InputDateTime({
  onChange,
  initialDate = new Date(),
  value,
  hoursToAdd = 0,
}: InputDateTimeProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ?? initialDate
  );

  const datepickerRef = useRef<InstanceType<typeof DatePicker> | null>(null);

  // Sincronizar cuando cambie el value desde el padre
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

  // Fecha mínima con horas sumadas
  const getMinDate = (): Date => {
    const date = new Date();
    date.setMinutes(0, 0, 0); // limpiar minutos y segundos
    date.setHours(date.getHours() + hoursToAdd);
    return date;
  };

  const handleChange = (date: Date | null) => {
    if (!date) {
      setSelectedDate(null);
      onChange?.(null);
      return;
    }

    const minDate = getMinDate();

    if (date < minDate) {
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
        dateFormat="yyyy/MM/dd HH:mm"
        placeholderText="aaaa/mm/dd hh:mm"
        className="outline-none text-black/50 focus:text-black"
        calendarClassName="z-50"
        minDate={getMinDate()}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30} // cada media hora
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
