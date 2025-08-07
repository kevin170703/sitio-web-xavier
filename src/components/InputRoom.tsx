"use client";

import { IconChevronDown, IconDoor } from "@tabler/icons-react";
import React, { useState } from "react";

interface RoomDetail {
  name: string;
  main_image: string;
  secondary_images: string[];
  price: number;
  capacity: number;
  description: string;
}

interface InputDataIconProps {
  label?: string;
  rooms: RoomDetail[];
}

export default function InputRoom({
  label = "Room",
  rooms,
}: InputDataIconProps) {
  const [openSelect, setOpenSelecet] = useState(false);

  const [roomSelect, setRoomSelect] = useState(rooms[0]);

  return (
    <div
      className="text-start w-max relative  bg-red-400"
      onClick={() => setOpenSelecet(!openSelect)}
    >
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        <IconDoor className="size-8 text-primary" />
        <p className="text-lg font-medium">{roomSelect.name}</p>
        <IconChevronDown
          className={`size-4 ${openSelect ? "-rotate-180" : ""} transition-all`}
        />
      </div>

      <p>{roomSelect.capacity} persons</p>

      {openSelect && ( // ojo, también corregí la condición lógica
        <div className="absolute top-full left-0 w-max bg-white p-4 rounded-lg border border-primary space-y-3 z-10">
          {rooms.map((room) => (
            <div
              key={room.name}
              onClick={() => setRoomSelect(room)}
              className="flex justify-start items-center gap-2 hover:scale-105 transition-all active:scale-100 cursor-pointer"
            >
              <IconDoor className="text-primary size-8" />
              <div className="">
                <p className="text-xl leading-4">{room.name}</p>
                <p className="text-sm">{room.capacity} persons</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
