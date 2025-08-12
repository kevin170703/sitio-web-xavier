import React, { startTransition, useEffect, useState } from "react";

import { Locale } from "@/i18n/config";
import { getUserLocale, setUserLocale } from "@/services/locales";

import Image from "next/image";

import canada from "@/assets/flags/canada.webp";
import españa from "@/assets/flags/españa.webp";
import francia from "@/assets/flags/francia.webp";

import { IconChevronDown } from "@tabler/icons-react";

export default function SelectLanguage({
  selectLink,
  scrolled,
}: {
  selectLink: string;
  scrolled: boolean;
}) {
  const [locale, setLocale] = useState("en");

  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  const [flag, setFlag] = useState(canada);

  async function getLanguage() {
    const locale = await getUserLocale();
    setLocale(locale);
  }

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
    getLanguage();
  }

  useEffect(() => {
    getLanguage();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpenLanguage(!isOpenLanguage)}
        className="flex items-center justify-center cursor-pointer "
        name="button-change-language"
      >
        {locale && (
          <Image width={50} height={50} src={flag} alt="" className="w-5 h-5" />
        )}

        {
          <IconChevronDown
            className={`w-4 h-4 ${
              isOpenLanguage ? "rotate-x-180" : ""
            } transition-all ${
              selectLink === "/" && !scrolled ? "text-black" : "text-white"
            }`}
          />
        }
      </button>

      {isOpenLanguage && (
        <div className="absolute top-10 right-0 flex justify-center items-start flex-col space-y-2 p-4 bg-white text-black rounded-md shadow-lg w-max z-50">
          <button
            className="flex items-center space-x-2 cursor-pointer active:scale-95 transition-all hover:text-primary"
            name="en"
            onClick={() => {
              onChange("en");
              setFlag(canada);
              setIsOpenLanguage(false);
            }}
          >
            <Image src={canada} alt="English" className="w-5 h-5 rounded" />
            <span>English</span>
          </button>

          <button
            className="flex items-center space-x-2 cursor-pointer active:scale-95 transition-all hover:text-primary"
            name="fr"
            onClick={() => {
              onChange("fr");
              setFlag(francia);
              setIsOpenLanguage(false);
            }}
          >
            <Image src={francia} alt="English" className="w-5 h-5 rounded" />
            <span>Frances</span>
          </button>

          <button
            className="flex items-center space-x-2 cursor-pointer active:scale-95 transition-all hover:text-primary"
            name="es"
            onClick={() => {
              onChange("es");
              setFlag(españa);
              setIsOpenLanguage(false);
            }}
          >
            <Image src={españa} alt="English" className="w-5 h-5 rounded" />
            <span>Español</span>
          </button>
        </div>
      )}
    </div>
  );
}
