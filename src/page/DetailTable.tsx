"use client";

import {
  IconLoader2,
  IconLock,
  IconMapPin,
  IconShare,
  IconSnowflake,
  IconSun,
  IconUser,
  IconWifi,
} from "@tabler/icons-react";

import Image from "next/image";

import tables1 from "@/assets/tables/1.avif";

import React, { useEffect, useState } from "react";
import axios from "axios";
import InputDateTime from "@/components/InputDateTime";
import ReserveTable from "@/components/ReserveTable";
import { useTranslations } from "next-intl";

export interface Table {
  id: number;
  table_number: string;
  capacity: number;
  location: string;
  status: "available" | "occupied" | "reserved"; // puedes ajustarlo según tus estados reales
  created_at: string; // formato ISO
  updated_at: string; // formato ISO
}

type FormData = {
  check_in_date: string; // "YYYY-MM-DD" o null
  check_out_date: string;
  occupancy: number;
  room_id: number;
};

const dataBackend = {
  name: "Table detail",
  main_image:
    "https://images.unsplash.com/photo-1643913591623-4335627a1677?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  secondary_images: [
    "https://images.unsplash.com/photo-1753832025074-d3930d1ef208?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1581955427155-890ed868b03b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  price: 100,
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  details: [
    {
      name: "4 person",
      icon: IconUser,
    },
    {
      name: "Wifi",
      icon: IconWifi,
    },
    {
      name: "Outdoor",
      icon: IconSun, // mesa al aire libre
    },
    {
      name: "Air conditioning",
      icon: IconSnowflake, // aire acondicionado
    },
    {
      name: "Private area",
      icon: IconLock, // mesa en zona privada
    },
  ],
};

export default function DetailTable() {
  const t = useTranslations();

  const [selectedImage, setSelectedImage] = useState(0);

  const [tables, setTables] = useState<Table[] | null>(null);

  const [copied, setCopied] = useState(false);

  const [loaderSearch, setLoaderSearch] = useState(false);

  const [roomAvailable, setRoomAvailable] = useState<null | boolean>(null);

  const [tableSelected, setTableSelected] = useState<Table | null>(null);

  const [avilabelTables, setAvilabelTables] = useState([]);

  const [dataReserve, setDataReserve] = useState({
    reservation_date: "",
    start_time: "",
    end_time: "",
    occupancy: 1,
    table_id: tableSelected?.id,
  });

  async function getTables(): Promise<void> {
    try {
      const { data } = await axios.get(
        "https://reservations-uty9.onrender.com/api/restaurant-tables"
      );

      const tables = data.data.filter(
        (table: Table) => table.status === "available"
      );

      if (Array.isArray(tables)) {
        setTables(tables);
        setTableSelected(tables[0]);
      } else {
        console.warn("La API no devolvió un array:", tables);
        setTables([]);
      }
    } catch (error) {
      console.error("Error al obtener las habitaciones:", error);
      setTables([]);
    }
  }

  const [formData, setFormData] = useState<FormData>({
    check_in_date: new Date(Date.now() + 1 * 60 * 60 * 1000) // ahora + 1 hora
      .toISOString()
      .slice(0, 16), // formato yyyy-MM-ddTHH:mm (ideal si lo manejas como string)
    check_out_date: new Date(Date.now() + 2 * 60 * 60 * 1000) // ahora + 2 horas
      .toISOString()
      .slice(0, 16),
    occupancy: 1,
    room_id: Number(2),
  });

  function changueTable(id: string) {
    const table = tables?.find((table) => table.id === Number(id));
    if (table) setTableSelected(table);
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderSearch(true);

    const checkInDate = new Date(formData.check_in_date);
    const checkOutDate = new Date(formData.check_out_date);

    const timeZone = "America/Toronto";

    // Función para formatear la hora en HH:mm en zona horaria dada
    const formatTimeInTZ = (date: Date, timeZone: string) => {
      return new Intl.DateTimeFormat("en-CA", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);
    };

    const reservation_date = formData.check_in_date
      .split("T")[0]
      .replace(/\//g, "-");

    const start_time = formatTimeInTZ(checkInDate, timeZone);
    const end_time = formatTimeInTZ(checkOutDate, timeZone);

    console.log(
      {
        reservation_date,
        start_time,
        end_time,
        occupancy: formData.occupancy,
        table_id: tableSelected?.id,
      },
      "datos a  enviar al back"
    );

    const { data } = await axios.post(
      "https://reservations-uty9.onrender.com/api/restaurant-reservations/check-availability",
      {
        reservation_date,
        start_time,
        end_time,
        occupancy: formData.occupancy,
        table_id: tableSelected?.id,
      }
    );

    setAvilabelTables(data.data.available_tables);

    setDataReserve({
      reservation_date,
      start_time,
      end_time,
      occupancy: 1,
      table_id: tableSelected?.id,
    });

    setRoomAvailable(data.data.specific_table_available);
    setLoaderSearch(false);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      console.log("entree", value);
      setFormData({ ...formData, occupancy: Number(value) });
    }
  };

  const handleCheckInChange = (date: Date | null) => {
    if (!date) return;

    const newCheckIn = date;

    // Checkout exactamente 1 hora después del check-in
    const newCheckOut = new Date(newCheckIn);
    newCheckOut.setHours(newCheckOut.getHours() + 1);

    setFormData({
      ...formData,
      check_in_date: newCheckIn.toISOString(),
      check_out_date: newCheckOut.toISOString(),
    });
  };

  const handleCheckOutChange = (date: Date | null) => {
    if (!date) return;

    const newCheckOut = date;

    // Checkin exactamente 1 hora antes del check-out
    const newCheckIn = new Date(newCheckOut);
    newCheckIn.setHours(newCheckIn.getHours() - 1);

    setFormData({
      ...formData,
      check_in_date: newCheckIn.toISOString(),
      check_out_date: newCheckOut.toISOString(),
    });
  };

  useEffect(() => {
    getTables();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // mensaje dura 2 segundos
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center text-black pb-20 gap-10">
      <section className="w-full min-h-[300px] h-[40dvh] overflow-hidden relative flex justify-center items-center">
        <div className="w-full h-full bg-primary/50  text-white flex flex-col justify-center items-center gap-2 pt-30">
          <h1 className="text-5xl">{t("detailTable.title")}</h1>

          <h2 className="font-secondary">Les P&apos;tits Lofts Du Lac</h2>
        </div>

        <Image
          src={tables1}
          height={900}
          width={1920}
          alt="image detail"
          className="object-cover absolute -z-10 h-full"
        />
      </section>

      <section className="w-full max-lg:flex-col-reverse max-w-[1300px] flex justify-center items-start gap-2 pt-20 px-5 ">
        {/* Fotos secundarias - Izquierda */}
        <div className="max-lg:w-full max-h-[600px] overflow-x-auto">
          <div className="w-max flex flex-col max-lg:flex-row justify-start items-center gap-2 ">
            {[tables1].map((image, index) => (
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

      <section className="w-full max-w-[1300px] flex max-lg:flex-col justify-between px-5 gap-y-10">
        <section className="w-[73%] max-lg:w-full space-y-10 ">
          <div className="w-full border border-black/8 rounded-3xl p-10 max-md:p-5">
            <div className="w-full space-y-4 flex justify-between items-start ">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center gap-2 w-full">
                  <div className="flex justify-start items-center gap-4">
                    <h2 className="text-4xl max-md:text-2xl">Table number:</h2>
                    <select
                      name=""
                      id=""
                      onChange={(e) => changueTable(e.target.value)}
                      className="text-3xl"
                    >
                      {tables &&
                        tables.map((table) => (
                          <option key={table.id} value={table.id}>
                            {table.table_number}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex justify-center items-center gap-4 border border-black/20 w-max px-4 py-2.5 rounded-full cursor-pointer"
                  >
                    <IconShare className="text-primary size-6" />
                    <p>
                      {copied
                        ? t("detailTable.buttonShareCopie")
                        : t("detailTable.buttonShare")}
                    </p>
                  </button>
                </div>

                <div className="flex justify-start items-center gap-2 pb-4">
                  <IconMapPin className="size-6 text-primary" />
                  <p className="text-black/70 text-sm">
                    108 Avenue de Venise O, Venise-en-Québec, QC J0J 2K0, Canadá
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-black/10 pt-5 mt-5">
              <div className="flex justify-start items-center gap-x-8 gap-y-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <IconUser className="text-primary size-6" />
                  <span>
                    {tableSelected?.capacity} {t("detailTable.items.1")}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <IconMapPin className="text-primary size-6" />
                  <span>{tableSelected?.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-medium">
              {t("detailTable.titleDescription")}
            </p>

            <p className="text-black/60">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book
            </p>
          </div>

          <div className="w-full space-y-2">
            <p className="text-2xl font-medium">
              {t("detailTable.titleLocation")}
            </p>

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

        <section className="w-[25%] max-lg:w-full h-max border border-black/10 rounded-3xl p-8 space-y-4">
          <p className="text-xl font-medium">
            {" "}
            {t("detailRoom.titleReservations")}
          </p>

          <form
            action=""
            onSubmit={(e) => handleSearch(e)}
            className="flex flex-col justify-center items-center gap-6"
          >
            <label htmlFor="" className="w-full h-max space-y-2">
              <p>{t("detailTable.form.peoples")}</p>
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
              <p>{t("detailTable.form.CheckIn")}</p>

              <InputDateTime
                onChange={handleCheckInChange}
                value={new Date(formData.check_in_date)}
                initialDate={new Date(formData.check_in_date)}
              />
            </label>

            <label htmlFor="" className="w-full h-max space-y-2">
              <p>{t("detailTable.form.CheckOut")}</p>

              <InputDateTime
                onChange={handleCheckOutChange}
                value={new Date(formData.check_out_date)}
                hoursToAdd={1}
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
                t("detailTable.form.button")
              )}
            </button>
          </form>
        </section>
      </section>

      {roomAvailable !== null && tableSelected !== null && (
        <section className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex flex-col justify-center items-center text-white p-6">
          <ReserveTable
            id={tableSelected.id.toString()}
            number_persons={formData.occupancy}
            date_reservations={dataReserve.reservation_date}
            start_time={dataReserve.start_time}
            end_time={dataReserve.end_time}
            roomAvailable={roomAvailable}
            avilabelTables={avilabelTables}
            setRoomAvailable={setRoomAvailable}
          />
        </section>
      )}
    </main>
  );
}
