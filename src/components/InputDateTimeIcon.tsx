"use client";

import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputDateTimeProps {
  onChange?: (date: Date | null) => void;
  initialDate?: Date | null;
  value?: Date | null;
  hoursToAdd?: number; // <-- en vez de daysToAdd
  icon: React.ReactNode;
  text: string;
}

export default function InputDateTimeIcon({
  onChange,
  initialDate = new Date(),
  value,
  hoursToAdd = 0,
  icon,
  text,
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
    <div
      className="w-[170px] flex  justify-center items-center relative gap-3 max-lg:border border-black/40 max-lg:py-2 max-lg:w-[190px] max-md:w-[160px] rounded-xl"
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
          dateFormat="yyyy/MM/dd HH:mm"
          placeholderText="aaaa/mm/dd hh:mm"
          className="outline-none text-black font-medium w-[124px] -mt-1 max-md:text-xs max-md:w-[95px] "
          calendarClassName="z-50"
          minDate={getMinDate()}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30} // cada media hora
        />
      </div>
    </div>
  );
}
