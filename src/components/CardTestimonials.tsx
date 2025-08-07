import { IconStarFilled } from "@tabler/icons-react";
import React from "react";

export default function CardTestimonials({
  testimonial,
  nameUser,
}: {
  testimonial: string;
  nameUser: string;
}) {
  return (
    <div className="w-[800px] max-lg:w-full flex flex-col justify-start items-center text-center gap-5  hover:scale-105 transition-all">
      <p className="text-xl text-primary">{nameUser}</p>
      <p className="text-xl font-medium text-text-secondary">
        &quot;{testimonial}&quot;
      </p>
      <div className="flex justify-center items-center gap-1 ">
        <IconStarFilled className="text-amber-400 w-5 h-5" />
        <IconStarFilled className="text-amber-400 w-5 h-5" />
        <IconStarFilled className="text-amber-400 w-5 h-5" />
        <IconStarFilled className="text-amber-400 w-5 h-5" />
        <IconStarFilled className="text-amber-400 w-5 h-5" />
      </div>
    </div>
  );
}
