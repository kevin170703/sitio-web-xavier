"use client";

import CardFood from "@/components/CardFood";
import { IconCurrencyDollar } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Food {
  name: string;
  price: number;
  main_image: string;
  category: string;
  description: string;
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
      description:
        "Huevos fritos servidos sobre tortillas de maíz con salsa de tomate picante, frijoles y guarnición fresca.",
    },
    {
      name: "Asado Criollo",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
      description:
        "Corte de carne asada a la parrilla con chimichurri, acompañado de papas rústicas y ensalada criolla.",
    },
    {
      name: "Tostadas con Palta",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Breakfast",
      description:
        "Crujientes tostadas de pan integral con palta fresca, aceite de oliva, sal marina y un toque de limón.",
    },
    {
      name: "Cheesecake de Frutilla",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dessert",
      description:
        "Delicado cheesecake cremoso sobre base de galleta, cubierto con mermelada y trozos frescos de frutilla.",
    },
    {
      name: "Sándwich de Milanesa",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Lunch",
      description:
        "Pan fresco relleno con milanesa de carne crocante, lechuga, tomate y mayonesa casera.",
    },
    {
      name: "Pasta Bolognesa",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
      description:
        "Pasta al dente bañada en una salsa bolognesa tradicional con carne molida, tomate y especias.",
    },
    {
      name: "Brownie con Helado",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dessert",
      description:
        "Brownie de chocolate húmedo acompañado de una bola de helado de vainilla y salsa de chocolate.",
    },
    {
      name: "Medialunas y Café",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Breakfast",
      description:
        "Medialunas recién horneadas con aroma a manteca, servidas con un café caliente y espumoso.",
    },
    {
      name: "Bowl de Quinoa",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Lunch",
      description:
        "Bowl nutritivo con quinoa, vegetales frescos, garbanzos y aderezo de limón y tahini.",
    },
    {
      name: "Pizza Margarita",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
      description:
        "Pizza artesanal con masa fina, salsa de tomate casera, mozzarella fresca y hojas de albahaca.",
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
      <section
        className="bg-primary  h-[40dvh] text-white flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(242, 177, 52, 0.8), rgba(242, 177, 52, 1)), url('/cozy-restaurant.png')`,
        }}
      >
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
            <CardFood
              main_image={food.main_image}
              name={food.name}
              price={food.price}
              key={food.name}
              decription={food.description}
            />
          ))}
      </section>
    </main>
  );
}
