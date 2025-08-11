"use client";

import { IconCurrencyDollar } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function CardFood({
  name,
  main_image,
  price,
  decription,
}: {
  name: string;
  main_image: string;
  price: number;
  decription: string;
}) {
  const [viewDescription, setViewDescription] = useState(false);

  return (
    <div
      key={name}
      className="relative w-[24%] aspect-square "
      onMouseEnter={() => setViewDescription(true)}
      onMouseLeave={() => setViewDescription(false)}
    >
      <Image
        src={main_image}
        alt={`food ${name}`}
        width={500}
        height={500}
        className="object-cover absolute top-0 left-0 w-full h-full"
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-end items-center bg-gradient-to-t from-primary  to-transparent to-40% p-4 gap-2">
        <p className="text-white text-3xl">{name}</p>
        <div className="flex justify-center items-center gap-8">
          <div className="flex justify-center items-center  text-white">
            <IconCurrencyDollar className="size-6" />
            <p className="text-xl">{price}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {viewDescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full z-30 backdrop-blur-sm bg-black/40 text-white p-10 flex flex-col justify-between items-start transition-all"
          >
            <div className="text-start space-y-4">
              <p className="text-xl">{decription}</p>
              <div className="w-max flex justify-center items-center  text-white">
                <IconCurrencyDollar className="size-6" />
                <p className="text-xl">{price}</p>
              </div>
            </div>

            <Link
              href={"/detail-table/1"}
              className="w-max flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:scale-105 transition-all active:scale-100"
            >
              Reserve a table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
