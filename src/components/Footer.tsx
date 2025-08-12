import { IconArrowUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 w-full flex flex-col justify-center items-center px-5">
      <section className="w-full max-2xl:max-w-[1200px] max-w-[1500px]">
        <div className="flex flex-wrap justify-between items-center gap-y-10">
          <div className="space-y-2">
            <h2 className="font-secondary text-3xl">
              Les P&apos;tits Lofts Du Lac
            </h2>
            <p className="text-lg leading-5 2xl:max-w-[200px]">
              1287 Maplewood Drive Toronto, ON M4B 1B3 Canada
            </p>
          </div>

          <div className="flex max-md:flex-col max-md:items-start justify-center items-center gap-x-24 gap-y-5">
            <div className="flex flex-col justify-center items-start text-white/70">
              <p className="text-xl font-medium text-white">Contacts</p>
              <div className="flex flex-col justify-center items-center gap-2">
                <Link
                  href={""}
                  className="flex justify-center items-center gap-1"
                >
                  Instagram
                  <IconArrowUp className="size-4 rotate-45 mb-1" />
                </Link>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Link
                  href={""}
                  className="flex justify-center items-center gap-1"
                >
                  Facebook
                  <IconArrowUp className="size-4 rotate-45 mb-1" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start text-white/70">
              <p className="text-xl font-medium text-white">Get in touch</p>
              <div className="flex flex-col justify-center items-center gap-2">
                <Link
                  href={""}
                  className="flex justify-center items-center gap-1"
                >
                  (+1) 123 4567 8910
                  <IconArrowUp className="size-4 rotate-45 mb-1" />
                </Link>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Link
                  href={""}
                  className="flex justify-center items-center gap-1"
                >
                  abcde@gmail.com
                  <IconArrowUp className="size-4 rotate-45 mb-1" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start text-white/70">
              <p className="text-xl font-medium text-white">Legal</p>
              <div className="flex flex-col justify-center items-center gap-2">
                <Link
                  href={""}
                  className="flex justify-center items-center gap-1"
                >
                  Terms & condition
                  <IconArrowUp className="size-4 rotate-45 mb-1" />
                </Link>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <Link
                  href={""}
                  className="flex justify-center items-center gap-1"
                >
                  Privacy policy
                  <IconArrowUp className="size-4 rotate-45 mb-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-red-200 text-sm flex flex-wrap justify-between items-center gap-y-5">
          <p>&copy; 2025 Les P&apos;tits Lofts Du Lac. All rights reserved.</p>

          <Link
            href="https://www.molokaih.ca/"
            target="_blank"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          >
            Developed by
            <Image
              src="/logo.webp"
              alt="Molokaih Logo"
              width={20}
              height={20}
              className="h-8 w-auto"
            />
            <span className="font-medium text-white">Molokaih</span>
          </Link>
        </div>
      </section>
    </footer>
  );
}
