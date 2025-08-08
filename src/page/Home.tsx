"use client";

import { useEffect, useState } from "react";
import {
  IconWifi,
  IconGlass,
  IconUser,
  IconCurrencyDollar,
  IconSoup,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
} from "@tabler/icons-react";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CardTestimonials from "@/components/CardTestimonials";
import Link from "next/link";
import axios from "axios";

const variantsTestimonials = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

// type FormData = {
//   check_in_date: string | null; // "YYYY-MM-DD" o null
//   check_out_date: string | null;
//   occupancy: number;
//   room_id: number | null;
// };

interface RoomImage {
  id: number;
  image_url: string;
  order: number;
  room_id: number;
}

export interface Room {
  id: number;
  room_number: string;
  room_type: string;
  capacity: number;
  number_of_beds: number;
  has_wifi: boolean;
  has_air_conditioning: boolean;
  has_tv: boolean;
  has_minibar: boolean;
  has_balcony: boolean;
  price_per_night: string;
  description: string;
  created_at: string;
  updated_at: string;
  images: RoomImage[];
}

interface MenuImage {
  id: number;
  image_url: string;
  order: number;
  menu_item_id: number;
}

interface MenuCategory {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  category: MenuCategory;
  created_at: string;
  updated_at: string;
  images: MenuImage[];
}

export default function Home() {
  const testimoniasls = [
    {
      id: "1",
      name: "Northview Consulting",
      position: "Facility Manager",
      testimonial:
        "We needed to repaint our offices, and Premium Coat did an awesome job. They were professional, knew exactly what we wanted, and finished early. We’d definitely hire them again.",
    },
    {
      id: "2",
      name: "Stonebridge Supplies",
      position: "Operations Director",
      testimonial:
        "We hired Premium Coat to paint the metal deck ceiling of our store, and they worked during the night to avoid disrupting our business hours. They were very organized, worked carefully, and made sure everything was ready for us to open the next day without any issues. Great service.",
    },

    {
      id: "3",
      name: "Diana Cameron",
      position: "Facility Supervisor",
      testimonial:
        "We hired Premium Coat to paint the metal deck ceiling of our store, and they worked during the night to avoid disrupting our business hours. They were very organized, worked carefully, and made sure everything was ready for us to open the next day without any issues. Great service.",
    },
  ];

  const [rooms, setRooms] = useState<Room[] | null>(null);

  const [menu, setMenu] = useState<MenuItem[] | null>(null);

  const [[indexTestimonial, direction], setIndexTestimonial] = useState([0, 0]);
  const changueIndex = (newDirection: number) => {
    setIndexTestimonial([indexTestimonial + newDirection, newDirection]);
  };

  function slugify(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD") // Elimina acentos
      .replace(/[\u0300-\u036f]/g, "") // Remueve caracteres diacríticos
      .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales
      .replace(/\s+/g, "-") // Reemplaza espacios por guiones
      .replace(/-+/g, "-"); // Evita múltiples guiones seguidos
  }

  // const [formData, setFormData] = useState<FormData>({
  //   check_in_date: new Date().toISOString().split("T")[0],
  //   check_out_date: new Date().toISOString().split("T")[0],
  //   occupancy: 1,
  //   room_id: null,
  // });

  // const handleSearch = () => {
  //   console.log("Datos finales:", formData);
  //   // Aquí puedes enviar `formData` a tu API
  // };

  async function getRooms(): Promise<void> {
    try {
      const { data } = await axios.get(
        "https://reservations-uty9.onrender.com/api/rooms"
      );

      const rooms = data.data;

      if (Array.isArray(rooms)) {
        setRooms(rooms);
      } else {
        console.warn("La API no devolvió un array:", rooms);
        setRooms([]);
      }
    } catch (error) {
      console.error("Error al obtener las habitaciones:", error);
      setRooms([]);
    }
  }

  async function getMenu(): Promise<void> {
    try {
      const { data } = await axios.get(
        "https://reservations-uty9.onrender.com/api/menu-items"
      );

      console.log(data, "menuuu");

      const menu = data.data;

      if (Array.isArray(menu)) {
        setMenu(menu);
      } else {
        console.warn("La API no devolvió un array:", menu);
        setMenu([]);
      }
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      setMenu([]);
    }
  }

  useEffect(() => {
    getRooms();
    getMenu();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Hero Section */}
      <section
        className="w-full relative h-screen bg-cover bg-center flex flex-col justify-center items-center "
        style={{
          backgroundImage: `linear-gradient(rgba(242, 177, 52, 0.8), rgba(242, 177, 52, 0.8)), url('/images/bg-hero.jpg')`,
        }}
      >
        <div className=" text-white text-center ">
          <h1 className="text-8xl font-light mb-4 font-secondary">
            Les P&apos;tits Lofts Du Lac
          </h1>
          <p className="text-lg w-full">
            Luxury lakeside accommodation with stunning views and exceptional
            service
          </p>
        </div>

        {/* Search Form */}
        {/* <div className="bg-white rounded-lg absolute bottom-10  flex justify-between px-10 py-4 items-center  text-black max-w-[1000px] w-full">
          <InputDataIcon
            onChange={(date) =>
              setFormData({
                ...formData,
                check_in_date: date ? date.toISOString().split("T")[0] : "",
              })
            }
            initialDate={new Date()}
            icon={<IconCalendarPlus className="size-8" />}
            label="Check in"
          />

          <InputDataIcon
            onChange={(date) =>
              setFormData({
                ...formData,
                check_out_date: date ? date.toISOString().split("T")[0] : "",
              })
            }
            icon={<IconCalendarMinus className="size-8" />}
            label="Check out"
          />

          {rooms && <InputRoom rooms={rooms} />}

          <button
            onClick={() => handleSearch()}
            className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:scale-105 transition-all active:scale-100"
          >
            <IconSearch className="size-5" />
            Search
          </button>
        </div> */}
      </section>

      {/* About Us Section */}
      <section className="py-20  flex justify-center items-center gap-10 w-full max-w-[1300px]">
        <div className="text-xl w-full max-w-[60%]">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            ABOUT US
          </label>
          <h2 className="text-5xl font-semibold mb-2">
            Les P&apos;tits Lofts Du Lac
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to Les P&apos;tits Lofts Du Lac, where luxury meets comfort
            in the heart of nature. Our boutique accommodation offers stunning
            lakeside views and personalized service that makes every stay
            memorable.
          </p>
          <p className="text-gray-600 mb-4">
            Each of our carefully designed lofts combines modern amenities with
            rustic charm, creating the perfect retreat for couples and families
            alike. Experience the tranquility of lake life while enjoying
            world-class hospitality.
          </p>
          <p className="text-gray-600">
            From sunrise coffee on your private balcony to evening dining at our
            lakeside restaurant, every moment at Les P&apos;tits Lofts is
            designed to create lasting memories.
          </p>
        </div>

        <div className="relative w-[40%]">
          <Image
            width={1900}
            height={1900}
            src="/cozy-restaurant.png"
            alt="Restaurant interior"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20 space-y-8">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            our rooms
          </label>
          <h2 className="text-5xl font-semibold mb-6">
            Rest, relax, and wake up inspired.
          </h2>
        </div>

        <div className="flex justify-center items-center gap-2">
          {rooms &&
            rooms.map((room) => (
              <Link
                href={`detail-room/${slugify(room.id.toString())}`}
                key={room.room_type}
                className="relative w-[460px] aspect-square group overflow-hidden active:scale-95 transition-all"
              >
                <Image
                  src={room.images[0].image_url}
                  alt={`Room ${room.room_type}`}
                  width={500}
                  height={500}
                  className="object-cover absolute top-0 left-0 w-full h-full group-hover:scale-110 transition-all duration-500"
                />

                <div className="relative z-10 w-full h-full flex flex-col justify-end items-center bg-gradient-to-t from-primary  to-transparent to-40% p-4 gap-2">
                  <p className="text-white text-3xl">{room.room_type}</p>
                  <div className="flex justify-center items-center gap-8">
                    <div className="flex justify-center items-center  text-white">
                      <IconUser className="size-6" />
                      <p className="text-xl">{room.capacity}</p>
                    </div>

                    <div className="flex justify-center items-center  text-white">
                      <IconCurrencyDollar className="size-6" />
                      <p className="text-xl">{room.price_per_night}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Comforts Section */}
      <section className="w-full py-20 space-y-20">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            Comforts
          </label>
          <h2 className="text-5xl font-semibold mb-6">
            Little details that make your stay better.
          </h2>
        </div>

        <div className="w-full flex justify-center items-center gap-40 ">
          <div className="flex flex-col items-center text-center">
            <IconWifi strokeWidth={1.5} className="size-20 text-primary" />
            <h3 className="font-medium mb-2">Free WiFi</h3>
          </div>
          <div className="flex flex-col items-center text-center">
            <IconGlass strokeWidth={1.5} className="size-20 text-primary" />
            <h3 className="font-medium mb-2">Welcome Drink</h3>
          </div>
          <div className="flex flex-col items-center text-center">
            <IconWifi strokeWidth={1.5} className="size-20 text-primary" />
            <h3 className="font-medium mb-2">Lake Access</h3>
          </div>
          <div className="flex flex-col items-center text-center">
            <IconGlass strokeWidth={1.5} className="size-20 text-primary" />
            <h3 className="font-medium mb-2">Fine Dining</h3>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 space-y-8">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            our menu
          </label>
          <h2 className="text-5xl font-semibold mb-6">
            Flavors that tell our story.
          </h2>
        </div>

        <div className="relative flex flex-wrap justify-center items-center gap-2 max-h-[930px] overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-t from-white  to-transparent to-50% z-20"></div>
          {menu &&
            menu.map((food) => (
              <div key={food.name} className="relative w-[460px] aspect-square">
                <Image
                  src={food.images[0].image_url}
                  alt={`food ${food.name}`}
                  width={500}
                  height={500}
                  className="object-cover absolute top-0 left-0 w-full h-full"
                />

                <div className="relative z-10 w-full h-full flex flex-col justify-end items-center bg-gradient-to-t from-primary  to-transparent to-40% p-4 gap-2">
                  <p className="text-white text-3xl">{food.name}</p>
                  <div className="flex justify-center items-center gap-8">
                    <div className="flex justify-center items-center  text-white">
                      <IconCurrencyDollar className="size-6" />
                      <p className="text-xl">{food.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="w-full flex justify-center items-center">
          <Link
            href={"/menu"}
            className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:scale-105 transition-all active:scale-100"
          >
            <IconSoup />
            View all
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full flex flex-col justify-center items-center py-20">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            testimonials
          </label>
          <h2 className="text-5xl font-semibold mb-6">
            Stories from guests who felt at home.
          </h2>
        </div>

        <motion.div className="w-full flex flex-col justify-center items-center gap-5 relative max-w-[1300px]">
          <div className="w-full h-[200px] relative flex justify-center items-center max-md:h-[300px]">
            <AnimatePresence initial={false} custom={direction}>
              {testimoniasls && (
                <motion.div
                  key={indexTestimonial}
                  variants={variantsTestimonials}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  transition={{
                    duration: 0.4,
                  }}
                  className="absolute w-max max-lg:w-full"
                >
                  <CardTestimonials
                    testimonial={testimoniasls[indexTestimonial].testimonial}
                    nameUser={testimoniasls[indexTestimonial].name}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute top-50% left-0 w-full flex justify-between items-center max-lg:relative  ">
            <button
              onClick={() => changueIndex(-1)}
              disabled={indexTestimonial === 0}
              className="disabled:text-[#ccc] disabled:cursor-default cursor-pointer"
            >
              <IconArrowLeft className="size-8" strokeWidth={1.5} />
            </button>

            <button
              onClick={() => changueIndex(1)}
              disabled={indexTestimonial >= testimoniasls.length - 1}
              className="disabled:text-[#ccc] disabled:cursor-default cursor-pointer"
            >
              <IconArrowRight className="size-8" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Our Ambience Section */}
      <section className="py-20 w-full flex flex-col justify-center items-center">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            Spaces
          </label>
          <h2 className="text-5xl font-semibold mb-6">
            Designed for moments worth remembering.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-2 w-full max-w-[1840px]">
          <div className="md:col-span-2">
            <Image
              width={1500}
              height={1500}
              src="/elegant-modern-restaurant.png"
              alt="Main dining room"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Image
              width={1500}
              height={1500}
              src="/cozy-restaurant-night.png"
              alt="Restaurant exterior"
              className="w-full h-38 object-cover rounded-lg"
            />
            <Image
              width={1500}
              height={1500}
              src="/intimate-lounge.png"
              alt="Lounge area"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Image
              width={1500}
              height={1500}
              src="/bright-cafe-seating.png"
              alt="Cafe area"
              className="w-full h-38 object-cover rounded-lg"
            />
            <Image
              width={1500}
              height={1500}
              src="/elegant-private-dining.png"
              alt="Private dining"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
          <div className="md:col-span-2">
            <Image
              width={1500}
              height={1500}
              src="/sophisticated-bar.png"
              alt="Bar area"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 w-full flex flex-col justify-center items-center">
        <section className="w-full max-w-[1300px]">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h2 className="font-secondary text-3xl">
                Les P&apos;tits Lofts Du Lac
              </h2>
              <p className="text-lg leading-5">
                1287 Maplewood Drive <br /> Toronto, ON M4B 1B3 <br /> Canada
              </p>
            </div>

            <div className="flex justify-center items-center gap-24">
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

          <div className="mt-8 pt-8 text-center text-red-200 text-sm">
            <p>
              &copy; 2024 Les P&apos;tits Lofts Du Lac. All rights reserved.
            </p>
          </div>
        </section>
      </footer>
    </div>
  );
}
