import { IconArrowUp, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

export default function ButtonReservations({
  scrolled,
}: {
  scrolled: boolean;
}) {
  const [viewMenu, setViewMenu] = useState(false);

  return (
    <button
      className={`relative flex justify-center items-center gap-2  px-4 py-2 rounded-xl cursor-pointer ${
        scrolled ? "bg-white text-primary" : "bg-primary text-white"
      }`}
      onMouseEnter={() => setViewMenu(true)}
      onMouseLeave={() => setViewMenu(false)}
    >
      Reservations
      <IconChevronDown
        className={`size-4 transition-all ${viewMenu ? "-rotate-180" : ""}`}
      />
      <AnimatePresence>
        {viewMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`absolute top-[105%] left-0  rounded-xl min-w-full p-2 ${
              scrolled ? "bg-white text-primary" : "bg-primary text-white"
            }`}
          >
            <Link
              href={""}
              className="flex justify-center items-center gap-1 text-lg hover:scale-105 transition-all active:scale-100"
            >
              Rooms
              <IconArrowUp className="size-4 rotate-45" />
            </Link>

            <Link
              href={""}
              className="flex justify-center items-center gap-1 text-lg hover:scale-105 transition-all active:scale-100"
            >
              Tables
              <IconArrowUp className="size-4 rotate-45" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
