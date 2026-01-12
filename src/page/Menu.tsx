"use client";

import CardFood from "@/components/CardFood";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { IconBowl, IconMoodSad } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string; // viene como string en el JSON
  created_at: string;
  updated_at: string;
  category_id: number;
  images: Image[];
  category: Category;
}

interface Image {
  id: number;
  menu_item_id: number;
  image_url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string; // o Date si haces parseo
  updated_at: string; // o Date
  menu_items: MenuItem[];
}

export default function Menu() {
  const t = useTranslations();

  const [categories, setCategorires] = useState(["All"]);

  const [categorySelected, setCategorySelected] = useState(categories[0]);

  const [menuSelectd, setMenuSelected] = useState<MenuItem[] | null>(null);

  const [menu, setMenu] = useState<MenuItem[] | null>(null);

  async function getMenu(): Promise<void> {
    try {
      const { data } = await axios.get(
        "xavier-backend.molokaih.ca/api/menu-items"
      );

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

  async function getCategories(): Promise<void> {
    try {
      const { data } = await axios.get(
        "xavier-backend.molokaih.ca/api/categories"
      );

      // Tipamos la data.data como Category[]
      const categories = (data.data as Category[]).map(
        (category) => category.name
      );

      console.log(data, "categorias");

      if (Array.isArray(categories)) {
        setCategorires(["All", ...categories]);
      } else {
        console.warn("La API no devolvió un array:", categories);
        setCategorires(["All"]);
      }
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      setCategorires(["All"]);
    }
  }
  useEffect(() => {
    getMenu();
    getCategories();
  }, []);

  useEffect(() => {
    if (menu !== null) {
      if (categorySelected === "All") {
        return setMenuSelected(menu);
      }

      const foods = menu.filter(
        (food) =>
          food.category.name.toLowerCase() === categorySelected.toLowerCase()
      );
      setMenuSelected(foods);
    }
  }, [categorySelected, menu]);

  if (!menu) return null;
  return (
    <main>
      <section
        className="bg-primary min-h-[450px] h-[55dvh] text-white flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(242, 177, 52, 0.8), rgba(242, 177, 52, 1)), url('/cozy-restaurant.png')`,
        }}
      >
        <h1 className="text-8xl font-secondary pt-20">{t("menu.title")}</h1>

        <div className="w-full max-md:overflow-y-auto">
          <div className="max-md:w-max flex md:flex-wrap justify-center items-center gap-6 pt-20 px-5">
            {categories &&
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategorySelected(category)}
                  className={`cursor-pointer hover:scale-105 transition-all active:scale-100 rounded-full text-lg border border-white px-6 py-2 flex justify-center items-center ${
                    categorySelected === category ? "bg-white text-primary" : ""
                  }  `}
                >
                  {category}
                </button>
              ))}
          </div>
        </div>
      </section>

      <section className="w-full relative flex flex-wrap justify-center items-center gap-2 py-5">
        {menuSelectd && menuSelectd.length > 0 ? (
          menuSelectd.map((food) => (
            <CardFood
              main_image={food.images[0].image_url}
              name={food.name}
              price={Number(food.price)}
              key={food.id}
              decription={food.description}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <IconBowl className="mb-2 size-48 opacity-50" />
            <p className="text-2xl font-medium">{t("menu.noFood")}</p>
          </div>
        )}
      </section>
    </main>
  );
}
