import Image from "next/image";
import React from "react";

import tables1 from "@/assets/tables/1.avif";
import ContactForm from "@/components/ContactForm";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations();

  return (
    <main className="w-full h-dvh min-h-[900px] max-md:space-y-10">
      <section className="w-full h-[40dvh] overflow-hidden relative flex justify-center items-center">
        <div className="w-full h-full bg-primary/50  text-white flex flex-col justify-center items-center gap-2 pt-30">
          <h1 className="text-5xl">{t("contact.title")}</h1>

          <h2 className="font-secondary">{t("contact.subtitle")}</h2>
        </div>

        <Image
          src={tables1}
          height={900}
          width={1920}
          alt="image detail"
          className="object-cover absolute -z-10 h-full"
        />
      </section>

      <section className="h-[60%] flex justify-center items-center ">
        <ContactForm />
      </section>
    </main>
  );
}
