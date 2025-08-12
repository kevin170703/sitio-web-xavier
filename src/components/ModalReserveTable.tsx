import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IconCalendarMinus,
  IconCalendarPlus,
  IconChevronDown,
  IconDoor,
  IconLoader2,
  IconSearch,
  IconSoup,
  IconUsers,
} from "@tabler/icons-react";
import { Room } from "@/page/Home";
import Reserve from "./Reserve";
import InputDataIcon from "./InputDataIcon";
import InputDateTime from "./InputDateTime";
import InputDateTimeIcon from "./InputDateTimeIcon";
import ReserveTable from "./ReserveTable";
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
  table_id: number;
};

export default function ModalReserveTable() {
  const t = useTranslations();

  const [loaderSearch, setLoaderSearch] = useState(false);

  const [roomAvailable, setRoomAvailable] = useState<null | boolean>(null);

  const [tables, setTables] = useState<Table[] | null>(null);

  const [openSelect, setOpenSelect] = useState(false);

  const [tableSelected, setTableSelected] = useState<Table | null>(null);

  const [avilabelTables, setAvilabelTables] = useState([]);

  const [dataReserve, setDataReserve] = useState({
    reservation_date: "",
    start_time: "",
    end_time: "",
    occupancy: 1,
    table_id: tableSelected?.id,
  });

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const [formData, setFormData] = useState<FormData>({
    check_in_date: new Date(Date.now() + 1 * 60 * 60 * 1000) // ahora + 1 hora
      .toISOString()
      .slice(0, 16), // formato yyyy-MM-ddTHH:mm (ideal si lo manejas como string)
    check_out_date: new Date(Date.now() + 2 * 60 * 60 * 1000) // ahora + 2 horas
      .toISOString()
      .slice(0, 16),
    occupancy: 0,
    table_id: 0,
  });

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
        setFormData({
          ...formData,
          table_id: tables[0].id,
          occupancy: tables[0].capacity,
        });
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

  useEffect(() => {
    getTables();
  }, []);

  if (formData.table_id !== 0 && tableSelected)
    return (
      <section>
        <form
          action=""
          onSubmit={(e) => handleSearch(e)}
          className="flex justify-center items-center gap-6 w-full max-lg:flex-col"
        >
          <div className="w-px h-5 bg-black/20 mr-8 max-xl:hidden"></div>

          <div className="flex justify-center items-center gap-x-20 gap-y-2 max-lg:flex-col ">
            <div className="flex justify-center items-center gap-x-20 max-lg:gap-x-2">
              <InputDateTimeIcon
                text={t("modalReserve.checkin")}
                icon={<IconCalendarPlus className="size-8" />}
                onChange={handleCheckInChange}
                value={new Date(formData.check_in_date)}
                initialDate={new Date(formData.check_in_date)}
              />

              <InputDateTimeIcon
                text={t("modalReserve.checkout")}
                icon={<IconCalendarMinus className="size-8" />}
                onChange={handleCheckOutChange}
                value={new Date(formData.check_out_date)}
                hoursToAdd={1}
                initialDate={new Date(formData.check_out_date)}
              />
            </div>

            <div className="flex justify-center items-center gap-x-20 max-lg:gap-x-2">
              <label
                htmlFor="input-peoples"
                className=" flex  justify-center items-center relative gap-3 w-[100px] max-lg:border border-black/40 max-lg:py-2 max-lg:w-[190px] max-md:w-[160px] rounded-xl"
              >
                <IconUsers className="size-8 text-black opacity-30" />

                <div
                  className=" flex flex-col justify-center items-start cursor-pointer w-[50px]"
                  // onClick={handleClick}
                >
                  <p className="text-base">{t("modalReserve.peoples")}</p>

                  <input
                    id="input-peoples"
                    type="text"
                    placeholder={formData.occupancy.toString()}
                    required
                    onChange={(e) => handleNumberChange(e)}
                    value={formData.occupancy}
                    className="w-[60px] outline-none font-medium text-xl -mt-1"
                  />
                </div>
              </label>

              <div className="relative max-lg:border border-black/40 max-lg:py-2 max-lg:w-[190px] max-md:w-[160px] rounded-xl">
                <div
                  className="cursor-pointer flex justify-center items-center gap-2"
                  onClick={() => setOpenSelect(!openSelect)}
                >
                  <IconSoup className="text-black opacity-30 size-8" />

                  <div className="flex flex-col justify-center items-start">
                    <p className="text-base">{t("modalReserve.tables")}</p>
                    <div className="flex justify-center items-center gap-2 -mt-1">
                      <p className="text-lg font-medium">
                        {tableSelected.table_number}
                      </p>

                      <IconChevronDown
                        className={`${
                          openSelect ? "rotate-180" : ""
                        } size-4 transition-all`}
                      />
                    </div>
                  </div>
                </div>

                {openSelect && (
                  <div className="min-w-max w-full h-max space-y-4 px-6 py-2 rounded-xl bg-white absolute bottom-[150%] shadow-2xl left-0 z-50">
                    {tables?.map((table) => (
                      <div
                        key={table.id}
                        className="flex justify-start items-center gap-4 cursor-pointer"
                        onClick={() => {
                          setTableSelected(table);
                          setOpenSelect(false);
                        }}
                      >
                        <div className="rounded-full shadow-xl p-2">
                          <IconSoup className="size-5 text-black/50" />
                        </div>
                        <p className="text-xl font-medium">
                          {table.table_number}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-px h-5 bg-black/20 max-xl:hidden"></div>

          <button
            type="submit"
            className="w-max max-lg:w-full rounded-full bg-primary text-white py-3 cursor-pointer flex justify-center items-center px-10"
          >
            {loaderSearch ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <IconSearch />
            )}
          </button>
        </form>

        {roomAvailable !== null && (
          <section className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex flex-col justify-center items-center text-white p-6 z-20">
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
      </section>
    );
}
