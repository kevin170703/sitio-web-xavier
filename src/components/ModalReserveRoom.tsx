import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IconCalendarMinus,
  IconCalendarPlus,
  IconChevronDown,
  IconDoor,
  IconLoader2,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { Room } from "@/page/Home";
import Reserve from "./Reserve";
import InputDataIcon from "./InputDataIcon";
import { useTranslations } from "next-intl";

type FormData = {
  check_in_date: string; // "YYYY-MM-DD" o null
  check_out_date: string;
  occupancy: number;
  room_id: number;
};

export default function ModalReserveRoom() {
  const t = useTranslations();

  const [loaderSearch, setLoaderSearch] = useState(false);

  const [roomAvailable, setRoomAvailable] = useState<null | boolean>(null);

  const [rooms, setRooms] = useState<Room[] | null>(null);

  const [openSelect, setOpenSelect] = useState(false);

  const [roomSelected, setRoomSelected] = useState<Room | null>(null);

  const [avilabelRooms, setAvilabelRooms] = useState([]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const [formData, setFormData] = useState<FormData>({
    check_in_date: formatDate(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)),
    check_out_date: formatDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)),
    occupancy: 0,
    room_id: 0,
  });

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderSearch(true);

    const { data } = await axios.post(
      "xavier-backend.molokaih.ca/api/hotel-reservations/check-availability",
      {
        check_in_date: formData.check_in_date.replace(/\//g, "-"),
        check_out_date: formData.check_out_date.replace(/\//g, "-"),
        occupancy: Number(formData.occupancy),
        room_id: Number(formData.room_id),
      }
    );

    setAvilabelRooms(data.data.available_rooms);

    setRoomAvailable(data.data.specific_room_available);
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

  async function getRooms(): Promise<void> {
    try {
      const { data } = await axios.get("xavier-backend.molokaih.ca/api/rooms");

      const rooms = data.data;

      if (Array.isArray(rooms)) {
        setRooms(rooms);
        setFormData({
          ...formData,
          room_id: rooms[0].id,
          occupancy: rooms[0].capacity,
        });
        setRoomSelected(rooms[0]);
      } else {
        console.warn("La API no devolvió un array:", rooms);
        setRooms([]);
      }
    } catch (error) {
      console.error("Error al obtener las habitaciones:", error);
      setRooms([]);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  if (formData.room_id !== 0 && roomSelected)
    return (
      <section>
        <form
          action=""
          onSubmit={(e) => handleSearch(e)}
          className="flex  justify-center items-center gap-6 w-full max-lg:flex-col"
        >
          <div className="w-px h-5 bg-black/20 mr-8 max-xl:hidden"></div>

          <div className="flex justify-center items-center gap-x-20 gap-y-2 max-lg:flex-col ">
            <div className="flex justify-center items-center gap-x-20 max-lg:gap-x-2">
              <InputDataIcon
                text={t("modalReserve.checkin")}
                icon={<IconCalendarPlus className="size-8" />}
                onChange={handleCheckInChange}
                value={new Date(formData.check_in_date)}
                initialDate={new Date(formData.check_in_date)}
              />

              <InputDataIcon
                text={t("modalReserve.checkout")}
                icon={<IconCalendarMinus className="size-8" />}
                onChange={handleCheckOutChange}
                value={new Date(formData.check_out_date)}
                daysToAdd={1}
                initialDate={new Date(formData.check_out_date)}
              />
            </div>

            <div className="flex justify-center items-center gap-x-20 max-lg:gap-x-2">
              <label
                htmlFor="input-peoples"
                className=" flex  justify-center items-center relative gap-3 w-[100px] max-lg:border border-black/40 max-lg:py-2 max-lg:w-[160px] rounded-xl"
              >
                <IconUsers className="size-8 text-black opacity-30" />

                <div
                  className=" flex flex-col justify-center items-start cursor-pointer w-[50px]"
                  // onClick={handleClick}
                >
                  <p className="text">{t("modalReserve.peoples")}</p>

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

              <div className="relative max-lg:border border-black/40 max-lg:py-2 max-lg:w-[160px] rounded-xl">
                <div
                  className="cursor-pointer flex justify-center items-center gap-2"
                  onClick={() => setOpenSelect(!openSelect)}
                >
                  <IconDoor className="size-8 text-black opacity-30" />

                  <div className="flex flex-col justify-center items-start">
                    <p className="text-base">{t("modalReserve.rooms")}</p>
                    <div className="flex justify-center items-center gap-2 -mt-1">
                      <p className="text-xl font-medium">
                        {roomSelected.room_type}
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
                  <div className="w-max h-max space-y-4 px-6 py-2 rounded-xl bg-white absolute bottom-[150%] shadow-2xl left-0 z-50">
                    {rooms?.map((room) => (
                      <div
                        key={room.id}
                        className="flex justify-start items-center gap-4 cursor-pointer"
                        onClick={() => {
                          setRoomSelected(room);
                          setOpenSelect(false);
                        }}
                      >
                        <div className="rounded-full shadow-xl p-2">
                          <IconDoor className="size-5 text-black/50" />
                        </div>

                        <p className="text-xl font-medium">{room.room_type}</p>
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
            <Reserve
              avilabelRooms={avilabelRooms}
              roomAvailable={roomAvailable}
              id={roomSelected.id.toString()}
              checkin={formData.check_in_date}
              checkout={formData.check_out_date}
              roomName={roomSelected.room_type}
              price={roomSelected.price_per_night}
              setRoomAvailable={setRoomAvailable}
            />
          </section>
        )}
      </section>
    );
}
