"use client";

import { IconCurrencyDollar } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Food {
  name: string;
  price: number;
  main_image: string;
  category: string;
}

export default function Menu() {
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

  const menu = [
    {
      name: "Huevos Rancheros",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Lunch",
    },
    {
      name: "Asado Criollo",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
    },
    {
      name: "Tostadas con Palta",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Breakfast",
    },
    {
      name: "Cheesecake de Frutilla",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dessert",
    },
    {
      name: "Sándwich de Milanesa",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Lunch",
    },
    {
      name: "Pasta Bolognesa",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
    },
    {
      name: "Brownie con Helado",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dessert",
    },
    {
      name: "Medialunas y Café",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Breakfast",
    },
    {
      name: "Bowl de Quinoa",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Lunch",
    },
    {
      name: "Pizza Margarita",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
    },
  ];

  const [categorySelected, setCategorySelected] = useState(categories[0]);

  const [menuSelectd, setMenuSelected] = useState<Food[] | null>(null);

  useEffect(() => {
    const foods = menu.filter((food) => food.category === categorySelected);
    setMenuSelected(foods);
  }, [categorySelected]);

  return (
    <main>
      <section className="bg-primary  h-[40dvh] text-white flex flex-col justify-center items-center">
        <p>Logo</p>
        <h1 className="text-8xl font-secondary">Menu</h1>

        <div className="flex justify-center items-center gap-6 pt-10">
          {categories &&
            categories.map((category) => (
              <button
                onClick={() => setCategorySelected(category)}
                className={`cursor-pointer hover:scale-105 transition-all active:scale-100 rounded-full text-lg border border-white px-6 py-2 flex justify-center items-center ${
                  categorySelected === category ? "bg-white text-primary" : ""
                }  `}
              >
                {category}
              </button>
            ))}
        </div>
      </section>

      <section className="relative flex flex-wrap justify-center items-center gap-2 py-5">
        {menuSelectd &&
          menuSelectd.map((food) => (
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
      </section>
    </main>
  );
}
