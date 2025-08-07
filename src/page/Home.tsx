"use client";

import { useState } from "react";
import {
  IconMenu2,
  IconWifi,
  IconGlass,
  IconChevronLeft,
  IconChevronRight,
  IconStar,
  IconStarFilled,
  IconCalendarPlus,
  IconCalendarMinus,
  IconUser,
  IconCurrency,
  IconCurrencyDollar,
  IconSoup,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
} from "@tabler/icons-react";
import InputData from "@/components/InputData";
import InputDataIcon from "@/components/InputDataIcon";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CardTestimonials from "@/components/CardTestimonials";
import Link from "next/link";

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

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "We had such a great experience at this bed and breakfast! Sylvie and Gerry made us feel at home and took such great care of us. They were so helpful with recommendations and made our stay truly memorable.",
      author: "Sarah M.",
      rating: 5,
    },
    {
      text: "Amazing location with beautiful views of the lake. The rooms are comfortable and the breakfast was delicious. Highly recommend!",
      author: "John D.",
      rating: 5,
    },
  ];

  const rooms = [
    {
      name: "Room detail",
      main_image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      secondary_images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      price: 100,
      capacity: 4,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      name: "Room2 detail",
      main_image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      secondary_images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      price: 100,
      capacity: 4,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },

    {
      name: "Room2 detail",
      main_image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      secondary_images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      price: 100,
      capacity: 4,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },

    {
      name: "Room2 detail",
      main_image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      secondary_images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      price: 100,
      capacity: 4,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
  ];

  const menu = [
    {
      name: "comida 1",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "comida 2",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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

  const [[indexTestimonial, direction], setIndexTestimonial] = useState([0, 0]);
  const changueIndex = (newDirection: number) => {
    setIndexTestimonial([indexTestimonial + newDirection, newDirection]);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Hero Section */}
      <section
        className="w-full relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(242, 177, 52, 0.8), rgba(242, 177, 52, 0.8)), url('/images/bg-hero.jpg')`,
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-8xl font-light mb-4 font-secondary">
            Les P'tits Lofts Du Lac
          </h1>
          <p className="text-lg mb-12 w-full">
            Luxury lakeside accommodation with stunning views and exceptional
            service
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row gap-4 text-black max-w-[1000px] w-full">
            <div className="flex-1">
              <InputDataIcon
                icon={<IconCalendarPlus className="size-8" />}
                label="Check in"
              />
            </div>
            <div className="flex-1">
              <InputDataIcon
                icon={<IconCalendarMinus className="size-8" />}
                label="Check out"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Guests</label>
              <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#f2b134]">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <button className="bg-[#f2b134] text-white px-8 py-2 rounded hover:bg-[#e1a02d] transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20  flex justify-center items-center gap-10 w-full max-w-[1300px]">
        <div className="text-xl w-full max-w-[60%]">
          <label className="text-2xl mb-6 font-secondary text-primary">
            ABOUT US
          </label>
          <h2 className="text-5xl font-semibold mb-6">About Us</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Welcome to Les P'tits Lofts Du Lac, where luxury meets comfort in
            the heart of nature. Our boutique accommodation offers stunning
            lakeside views and personalized service that makes every stay
            memorable.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Each of our carefully designed lofts combines modern amenities with
            rustic charm, creating the perfect retreat for couples and families
            alike. Experience the tranquility of lake life while enjoying
            world-class hospitality.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From sunrise coffee on your private balcony to evening dining at our
            lakeside restaurant, every moment at Les P'tits Lofts is designed to
            create lasting memories.
          </p>
        </div>

        <div className="relative w-[40%]">
          <img
            src="/cozy-restaurant.png"
            alt="Restaurant interior"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Accommodation Section */}
      <section className="py-20 space-y-8">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary">
            OUR ROOMS
          </label>
          <h2 className="text-5xl font-semibold mb-6">Accommodation</h2>
        </div>

        <div className="flex justify-center items-center gap-2">
          {rooms.map((room) => (
            <div key={room.name} className="relative w-[460px] aspect-square">
              <Image
                src={room.main_image}
                alt={`Room ${room.name}`}
                width={500}
                height={500}
                className="object-cover absolute top-0 left-0 w-full h-full"
              />

              <div className="relative z-10 w-full h-full flex flex-col justify-end items-center bg-gradient-to-t from-primary  to-transparent to-40% p-4 gap-2">
                <p className="text-white text-3xl">{room.name}</p>
                <div className="flex justify-center items-center gap-8">
                  <div className="flex justify-center items-center  text-white">
                    <IconUser className="size-6" />
                    <p className="text-xl">{room.capacity}</p>
                  </div>

                  <div className="flex justify-center items-center  text-white">
                    <IconCurrencyDollar className="size-6" />
                    <p className="text-xl">{room.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 space-y-20">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            Benefits
          </label>
          <h2 className="text-5xl font-semibold mb-6">Benefits</h2>
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

      {/* Food Section */}
      <section className="py-20 space-y-8">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            our menu
          </label>
          <h2 className="text-5xl font-semibold mb-6">Menu</h2>
        </div>

        <div className="flex justify-center items-center gap-2">
          {menu.map((food) => (
            <div key={food.name} className="relative w-[460px] aspect-square">
              <Image
                src={food.main_image}
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
          <button className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl">
            <IconSoup />
            View all
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full flex flex-col justify-center items-center py-20">
        <div className="w-full text-center">
          <label className="text-2xl mb-6 font-secondary text-primary uppercase">
            testimonials
          </label>
          <h2 className="text-5xl font-semibold mb-6">Testimonials</h2>
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
            testimonials
          </label>
          <h2 className="text-5xl font-semibold mb-6">Testimonials</h2>
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
                Les P'tits Lofts Du Lac
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
            <p>&copy; 2024 Les P'tits Lofts Du Lac. All rights reserved.</p>
          </div>
        </section>
      </footer>
    </div>
  );
}
