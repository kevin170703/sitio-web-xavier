"use client";

import ButtonSend from "@/components/ButtonSend";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { sendEmail } from "@/services/resend";
import {
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ContactForm() {
  const [loaderEmail, setLoaderEmail] = useState(false);
  const [isSender, setIsSender] = useState(false);

  const [dataForm, setDataForm] = useState({
    name: "",
    lastname: "",
    email: "",
    message: "",
    phone: "",
  });

  // Función para validar y formatear el nombre (solo letras y espacios)
  const validateName = (value: string): string => {
    return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");
  };

  // Función para validar la estructura del email en tiempo real
  const validateEmailInput = (value: string): string => {
    return value.replace(/[^\w@.-]/g, "");
  };

  const validatePhoneInput = (value: string): string => {
    // Permitir solo dígitos, espacios, paréntesis, guiones y el símbolo +
    return value.replace(/[^\d\s()+-]/g, "");
  };

  function handelChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    let newValue = value;

    switch (name) {
      case "name":
        newValue = validateName(value);
        if (newValue.length > 30) newValue = newValue.slice(0, 30);
        break;
      case "lastname":
        newValue = validateName(value);
        if (newValue.length > 30) newValue = newValue.slice(0, 30);
        break;
      case "email":
        newValue = validateEmailInput(value);
        if (newValue.length > 35) newValue = newValue.slice(0, 35);
        break;
      case "phone":
        newValue = validatePhoneInput(value);
        if (newValue.length > 30) newValue = newValue.slice(0, 30);
        break;
      case "message":
        if (newValue.length > 200) newValue = newValue.slice(0, 200);
        break;
    }

    // Actualizar el valor solo si ha pasado las validaciones
    if (newValue !== value) {
      // Si es un input de tipo HTMLInputElement, actualizar directamente su valor
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        e.target.value = newValue;
      }
    }

    setDataForm({ ...dataForm, [name]: newValue });
  }

  async function hadelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoaderEmail(true);
    try {
      const respose = await sendEmail({
        name: dataForm.name,
        email: dataForm.email,
        message: dataForm.message,
        lastname: dataForm.lastname,
        phone: dataForm.phone,
      });
      if (respose.success) {
        setIsSender(true);
        setDataForm({
          name: "",
          email: "",
          message: "",
          phone: "",
          lastname: "",
        });
      } else {
        alert("Error sending the message. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Error sending the message. Please try again.");
    } finally {
      setLoaderEmail(false);
    }
  }
  return (
    <div className="w-full max-w-[1900px] flex justify-center items-center gap-20 bg-transparent max-lg:flex-col max-lg:p-0 max-md:px-5">
      <form
        action=""
        onSubmit={hadelSubmit}
        className="w-full max-w-[40%] max-2xl:max-w-[55%] max-lg:max-w-full flex flex-col justify-start items-start gap-x-10 gap-y-5 max-lg:px-10 max-md:px-0"
      >
        <div className="w-full flex max-lg:flex-col justify-center items-center gap-4">
          <Input
            label="Name"
            name={"name"}
            placeholder="Your name"
            value={dataForm.name}
            onChange={handelChange}
            id="1"
            required={true}
          />
          <Input
            required={true}
            label="Lastname"
            name={"lastname"}
            placeholder="Your lastname"
            value={dataForm.lastname}
            onChange={handelChange}
            id="lastname"
          />
        </div>

        <div className="w-full flex max-lg:flex-col justify-center items-center gap-4">
          <Input
            label="Email"
            name={"email"}
            placeholder="Your email"
            value={dataForm.email}
            onChange={handelChange}
            id="Email"
            required={true}
            type="email"
          />

          <Input
            label="Phone"
            name={"phone"}
            placeholder="Your phone"
            value={dataForm.phone}
            onChange={handelChange}
            id="phone"
            required={true}
            type="text"
          />
        </div>

        <TextArea
          label="Message"
          name={"message"}
          placeholder="Your message"
          value={dataForm.message}
          onChange={handelChange}
          id="Message"
          required={true}
        />

        <div className="w-full flex justify-start items-center">
          <ButtonSend
            text="Send"
            loader={loaderEmail}
            success={isSender}
            disabled={loaderEmail || isSender}
          />
        </div>
      </form>

      {/* <div className="text-start space-y-10 w-full max-w-[30%] max-lg:max-w-full flex flex-col max-lg:flex-row max-lg:flex-wrap max-lg:justify-between gap-x-10">
        <div className="flex flex-col justify-center items-start gap-4 ">
          <h2 className="w-full text-lg">¿Cómo encontrarnos?</h2>
          <div className="flex justify-start items-center gap-2">
            <IconMapPin stroke={1} className="text-primary" />
            <p className="text-base text-white/70 font-light ">
              Calle Justo Sierra 227, Gustavo A. Madero, CDMX
            </p>
          </div>
          <Link
            href={"mailto:info@paredesyasociados.mx"}
            target="_blank"
            className="flex justify-start items-center gap-2 "
          >
            <IconMail stroke={1} className="text-primary" />
            <p className="text-base text-white/70 font-light ">
              info@paredesyasociados.mx
            </p>
          </Link>

          <Link
            href={"https://wa.me/525576595535"}
            target="_blank"
            className="flex justify-start items-center gap-2"
          >
            <IconPhone stroke={1} className="text-primary" />
            <p className="text-base text-white/70 font-light ">
              +52 5576595535
            </p>
          </Link>
        </div>

      
      </div> */}
    </div>
  );
}
