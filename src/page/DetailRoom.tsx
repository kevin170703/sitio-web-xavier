"use client";

import InputData from "@/components/InputData";
import {
  IconBath,
  IconBed,
  IconMapPin,
  IconRulerMeasure,
  IconShare,
  IconSnowflake,
  IconUser,
  IconWifi,
} from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";

const dataBackend = {
  name: "Room detail",
  main_image:
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  secondary_images: [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  price: 100,
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  details: [
    {
      name: "1 person",
      icon: IconUser,
    },

    {
      name: "1 Bed",
      icon: IconBed,
    },

    {
      name: "1 Bath",
      icon: IconBath,
    },

    {
      name: "20 m2",
      icon: IconRulerMeasure,
    },

    {
      name: "Wifi",
      icon: IconWifi,
    },
    {
      name: "Air conditioning",
      icon: IconSnowflake,
    },
  ],
};

export default function DetailRoom() {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <main className="flex flex-col justify-center items-center text-black pb-20 gap-10">
      <section className="w-full h-[30dvh] overflow-hidden relative flex justify-center items-center">
        <div className="w-full h-full bg-primary/50  text-white flex flex-col justify-center items-center gap-2">
          <h1 className="text-5xl">{dataBackend.name}</h1>

          <h2 className="font-secondary">Les P'tits Lofts Du Lac</h2>
        </div>

        <Image
          src={dataBackend.main_image}
          height={900}
          width={1920}
          alt="image detail"
          className="object-cover absolute -z-10"
        />
      </section>

      <section className="w-full max-w-[1300px] flex justify-center items-start gap-2 pt-20 ">
        {/* Fotos secundarias - Izquierda */}
        <div className="">
          <div className="flex flex-col justify-start items-center gap-2 ">
            {[
              dataBackend.main_image,
              ...dataBackend.secondary_images,
              ...dataBackend.secondary_images,
              ...dataBackend.secondary_images,
            ].map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? "border-[#F2B134]"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Vista ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-[200px] h-[100px] object-cover aspect-2/1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Foto principal - Centro */}
        <div className="relative rounded-3xl overflow-hidden flex-1">
          <Image
            src={
              selectedImage === 0
                ? dataBackend.main_image
                : dataBackend.secondary_images[selectedImage - 1]
            }
            alt={dataBackend.name}
            width={900}
            height={700}
            className="w-full h-full object-cover aspect-2/1"
          />
        </div>
      </section>

      <section className="w-full max-w-[1300px] flex justify-between">
        <section className="w-[73%] space-y-10 ">
          <div className="w-full border border-black/8 rounded-3xl p-10">
            <div className="space-y-4 flex justify-between items-start w-full">
              <div className="space-y-4">
                <h2 className="text-4xl">{dataBackend.name}</h2>

                <div className="flex justify-start items-center gap-2 pb-4">
                  <IconMapPin className="size-6 text-primary" />
                  <p className="text-black/70 text-sm">
                    108 Avenue de Venise O, Venise-en-Québec, QC J0J 2K0, Canadá
                  </p>
                </div>

                <p>
                  <span className="text-primary text-3xl font-medium font-secondary">
                    ${dataBackend.price}{" "}
                  </span>
                  / day
                </p>
              </div>

              <div className="h-full flex justify-end items-start">
                <button className="bg-secondary text-white rounded-full px-4 py-2">
                  VIP room
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-black/10 pt-5 mt-5">
              <div className="flex justify-start items-center gap-14">
                {dataBackend.details.map((detail, index) => {
                  const IconComponent = detail.icon;
                  return (
                    <div key={index} className="flex items-center gap-1">
                      <IconComponent className="text-primary size-6" />
                      <span>{detail.name}</span>
                    </div>
                  );
                })}
              </div>

              <button className="flex justify-center items-center gap-4 border border-black/20 w-max px-4 py-2.5 rounded-full ">
                <IconShare className="text-primary size-6 " />
                <p>Share</p>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-medium">Description</p>

            <p className="text-black/60">{dataBackend.description}</p>
          </div>

          <div className="w-full space-y-2">
            <p className="text-2xl font-medium">Location</p>

            <iframe
              title="Work area"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.0254287226003!2d-73.1496184237466!3d45.085277471070235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc98d646616df71%3A0x5a1bce1dd635aaa4!2sLes%20P&#39;tits%20Lofts%20Du%20Lac!5e0!3m2!1ses!2sar!4v1754503260334!5m2!1ses!2sar"
              width="600"
              height="400"
              loading="lazy"
              className="w-full aspect-video rounded-3xl"
            ></iframe>
          </div>
        </section>

        <section className="w-[25%] h-max border border-black/10 rounded-3xl p-8 space-y-4">
          <p className="text-xl font-medium">Reservation</p>

          <form
            action=""
            className="flex flex-col justify-center items-center gap-6"
          >
            <label htmlFor="" className="w-full h-max space-y-2">
              <p>Name*</p>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-black/10 rounded-xl outline-none px-4 py-2"
              />
            </label>

            <label htmlFor="" className="w-full h-max space-y-2">
              <p>Number*</p>
              <input
                type="text"
                placeholder="Your number"
                className="w-full border border-black/10 rounded-xl outline-none px-4 py-2"
              />
            </label>

            <label htmlFor="" className="w-full h-max space-y-2">
              <p>Check in*</p>

              <InputData />
            </label>

            <label htmlFor="" className="w-full h-max space-y-2">
              <p>Check out*</p>

              <InputData />
            </label>

            <button className="w-full rounded-full bg-primary text-white py-3 ">
              check availability
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
