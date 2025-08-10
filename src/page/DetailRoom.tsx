"use client";

import InputData from "@/components/InputData";
import {
  IconCarFan,
  IconDeviceTv,
  IconLoader2,
  IconMapPin,
  IconShare,
  IconSnowflake,
  IconUser,
  IconWifi,
} from "@tabler/icons-react";

import axios from "axios";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import { Room } from "./Home";
import { useParams } from "next/navigation";
import Reserve from "@/components/Reserve";

type FormData = {
  check_in_date: string; // "YYYY-MM-DD" o null
  check_out_date: string;
  occupancy: number;
  room_id: number;
};

export default function DetailRoom() {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);

  const [room, setRoom] = useState<Room | null>(null);

  const [roomAvailable, setRoomAvailable] = useState<null | boolean>(null);

  const [copied, setCopied] = useState(false);

  const [loaderSearch, setLoaderSearch] = useState(false);

  async function getRoom() {
    const { data } = await axios.get(
      `https://reservations-uty9.onrender.com/api/rooms/${id}`
    );
    const room = data.data;
    setRoom(room);
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const [formData, setFormData] = useState<FormData>({
    check_in_date: formatDate(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)),
    check_out_date: formatDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)),
    occupancy: 3,
    room_id: Number(id),
  });

  const handleCheckInChange = (date: Date | null) => {
    if (!date) return;

    const newCheckIn = date;
    let newCheckOut = new Date(formData.check_out_date);

    // Si check-out es igual o anterior al nuevo check-in → moverlo un día después
    if (newCheckOut <= newCheckIn) {
      newCheckOut = new Date(newCheckIn);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
    }

    setFormData({
      ...formData,
      check_in_date: newCheckIn.toISOString().split("T")[0],
      check_out_date: newCheckOut.toISOString().split("T")[0],
    });
  };

  const handleCheckOutChange = (date: Date | null) => {
    if (!date) return;

    const newCheckOut = date;
    let newCheckIn = new Date(formData.check_in_date);

    // Si check-in es igual o posterior al nuevo check-out → moverlo un día antes
    if (newCheckIn >= newCheckOut) {
      newCheckIn = new Date(newCheckOut);
      newCheckIn.setDate(newCheckIn.getDate() - 1);
    }

    setFormData({
      ...formData,
      check_in_date: newCheckIn.toISOString().split("T")[0],
      check_out_date: newCheckOut.toISOString().split("T")[0],
    });
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderSearch(true);

    const { data } = await axios.post(
      "https://reservations-uty9.onrender.com/api/hotel-reservations/check-availability",
      {
        check_in_date: formData.check_in_date.replace(/\//g, "-"),
        check_out_date: formData.check_out_date.replace(/\//g, "-"),
        occupancy: Number(formData.occupancy),
        room_id: Number(formData.room_id),
      }
    );

    setRoomAvailable(data.data.specific_room_available);
    setLoaderSearch(false);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setFormData({ ...formData, occupancy: Number(value) });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // mensaje dura 2 segundos
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  if (!room) return null;
  else
    return (
      <main className="relative flex flex-col justify-center items-center text-black pb-20 gap-10">
        <section className="w-full h-[40dvh] overflow-hidden relative flex justify-center items-center">
          <div className="w-full h-full bg-primary/50  text-white flex flex-col justify-center items-center gap-2 pt-30">
            <h1 className="text-5xl">{room?.room_type}</h1>

            <h2 className="font-secondary">Les P&apos;tits Lofts Du Lac</h2>
          </div>

          <Image
            src={room?.images[0].image_url}
            height={900}
            width={1920}
            alt="image detail"
            className="object-cover absolute -z-10"
          />
        </section>

        <section className="w-full max-w-[1300px] flex justify-center items-start gap-2 pt-20 ">
          {/* Fotos secundarias - Izquierda */}
          <div className="max-h-[600px] overflow-y-auto">
            <div className="flex flex-col justify-start items-center gap-2 ">
              {[...room?.images.map((image) => image.image_url)].map(
                (image, index) => (
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
                )
              )}
            </div>
          </div>

          {/* Foto principal - Centro */}
          <div className="relative rounded-3xl overflow-hidden flex-1">
            <Image
              src={room.images[selectedImage].image_url}
              alt={room?.room_type}
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
                  <h2 className="text-4xl">{room.room_type}</h2>

                  <div className="flex justify-start items-center gap-2 pb-4">
                    <IconMapPin className="size-6 text-primary" />
                    <p className="text-black/70 text-sm">
                      108 Avenue de Venise O, Venise-en-Québec, QC J0J 2K0,
                      Canadá
                    </p>
                  </div>

                  <p>
                    <span className="text-primary text-3xl font-medium font-secondary">
                      ${room.price_per_night}{" "}
                    </span>
                    / day
                  </p>
                </div>

                {/* <div className="h-full flex justify-end items-start">
                  <button className="bg-secondary text-white rounded-full px-4 py-2">
                    VIP room
                  </button>
                </div> */}

                <div>
                  <button
                    onClick={handleCopy}
                    className="flex justify-center items-center gap-4 border border-black/20 w-max px-4 py-2.5 rounded-full cursor-pointer"
                  >
                    <IconShare className="text-primary size-6" />
                    <p>{copied ? "Link copied!" : "Share"}</p>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-black/10 pt-5 mt-5">
                <div className="flex justify-start items-center gap-14">
                  <div className="flex items-center gap-1">
                    <IconUser className="text-primary size-6" />
                    <span>{room.capacity} persons</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <IconWifi className="text-primary size-6" />
                    <span>
                      {room.has_wifi ? "With Wi-Fi" : "Without Wi-Fi"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <IconSnowflake className="text-primary size-6" />
                    <span>
                      {room.has_air_conditioning
                        ? "Air conditioning"
                        : "No air conditioning"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <IconCarFan className="text-primary size-6" />
                    <span>
                      {room.has_balcony ? "with balcony" : "Without balcony"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <IconDeviceTv className="text-primary size-6" />
                    <span>{room.has_tv ? "With TV" : "Without TV"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-2xl font-medium">Description</p>

              <p className="text-black/60">{room.description}</p>
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
              onSubmit={(e) => handleSearch(e)}
              className="flex flex-col justify-center items-center gap-6"
            >
              <label htmlFor="" className="w-full h-max space-y-2">
                <p>Number of people*</p>
                <input
                  type="text"
                  placeholder={formData.occupancy.toString()}
                  required
                  onChange={(e) => handleNumberChange(e)}
                  value={formData.occupancy}
                  className="w-full border border-black/10 rounded-xl outline-none px-4 py-2"
                />
              </label>

              <label htmlFor="" className="w-full h-max space-y-2">
                <p>Check in*</p>

                <InputData
                  onChange={handleCheckInChange}
                  value={new Date(formData.check_in_date)}
                  initialDate={new Date(formData.check_in_date)}
                />
              </label>

              <label htmlFor="" className="w-full h-max space-y-2">
                <p>Check out*</p>

                <InputData
                  onChange={handleCheckOutChange}
                  value={new Date(formData.check_out_date)}
                  daysToAdd={1}
                  initialDate={new Date(formData.check_out_date)}
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-primary text-white py-3 cursor-pointer flex justify-center items-center"
              >
                {loaderSearch ? (
                  <IconLoader2 className="animate-spin" />
                ) : (
                  "check availability"
                )}
              </button>
            </form>
          </section>
        </section>

        {roomAvailable !== null && (
          <section className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex flex-col justify-center items-center text-white p-6">
            <Reserve
              roomAvailable={roomAvailable}
              id={room.id.toString()}
              checkin={formData.check_in_date}
              checkout={formData.check_out_date}
              roomName={room.room_type}
              roomDescription={room.description}
              price={room.price_per_night}
              setRoomAvailable={setRoomAvailable}
            />
          </section>
        )}
      </main>
    );
}
