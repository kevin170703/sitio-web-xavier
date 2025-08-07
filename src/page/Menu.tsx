"use client";

import React, { useState } from "react";

export default function Menu() {
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

  const [categorySelected, setCategorySelected] = useState(categories[0]);

  const menu = [
    {
      name: "comida 1",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Lunch",
    },
    {
      name: "comida 2",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
    },
    {
      name: "comida 1",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Breakfast",
    },
    {
      name: "comida 2",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dessert",
    },
    {
      name: "comida 1",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Lunch",
    },
    {
      name: "comida 2",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
    },
    {
      name: "comida 1",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dessert",
    },
    {
      name: "comida 2",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Breakfast",
    },
    {
      name: "comida 1",
      price: 12,
      main_image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Lunch",
    },
    {
      name: "comida 2",
      price: 9,
      main_image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dinner",
    },
  ];

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

      <section></section>
    </main>
  );
}
