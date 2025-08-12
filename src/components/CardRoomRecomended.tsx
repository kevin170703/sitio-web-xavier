import {
  IconCarFan,
  IconChevronDown,
  IconDeviceTv,
  IconSnowflake,
  IconUsers,
  IconWifi,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

export default function CardRoomRecomended({
  id,
  room_type,
  price_per_night,
  capacity,
  has_wifi,
  has_air_conditioning,
  has_balcony,
  has_tv,
  image,
  changueRoom,
}: {
  id: number;
  room_type: string;
  price_per_night: string;
  capacity: number;
  has_wifi: boolean;
  has_air_conditioning: boolean;
  has_balcony: boolean;
  has_tv: boolean;
  image: string;
  changueRoom: ({
    id,
    price,
    roomName,
  }: {
    id: string;
    price: string;
    roomName: string;
  }) => void;
}) {
  const t = useTranslations();

  const [seeFeatures, setSeeFeatures] = useState(false);

  return (
    <div
      className="w-[600px] max-w-full min-h-[100px] rounded-2xl flex max-md:flex-col  justify-between items-center shadow-2xl p-4 gap-y-5"
      key={id}
    >
      <div className="flex max-md:flex-col justify-start items-center gap-4">
        <Image
          src={image}
          width={500}
          height={500}
          alt={room_type}
          className="h-full max-md:w-full  w-[160px] object-cover rounded-xl"
        />
        <div className="w-full h-full flex flex-col justify-between items-start gap-4">
          <div className="rounded-full flex justify-between items-center gap-4">
            <p className="text-xl font-medium">{room_type}</p>
          </div>

          <button
            type="button"
            className="bg-primary rounded-full  p-1 flex justify-between items-center gap-4 cursor-pointer"
            onClick={() =>
              changueRoom({
                id: id.toString(),
                price: price_per_night.toString(),
                roomName: room_type.toString(),
              })
            }
          >
            <p className="pl-3 text-white text-base">
              {t("reserveRoom.buttonBook")}
            </p>

            <p className="bg-white text-primary rounded-full text-xs px-2 py-0.5">
              ${price_per_night}
            </p>
          </button>
        </div>
      </div>

      <div className="w-max max-md:w-full h-full flex flex-col justify-center items-start gap-2 relative">
        <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
          <IconUsers className="size-4 opacity-40" />
          <p className="-mb-1">{capacity}</p>
        </div>

        {seeFeatures && (
          <div className="max-md:w-[110%] absolute  top-[26px] left-1/2 -translate-x-1/2 w-max bg-white rounded-xl p-4 z-10 shadow-2xl">
            <div className="flex flex-col justify-center items-center gap-2">
              {has_wifi && (
                <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                  <IconWifi className="size-4  opacity-40" />
                  <span className="text-sm">{t("reserveRoom.items.1")}</span>
                </div>
              )}

              {has_air_conditioning && (
                <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                  <IconSnowflake className="size-4  opacity-40" />
                  <span className="text-sm">{t("reserveRoom.items.2")}</span>
                </div>
              )}

              {has_balcony && (
                <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                  <IconCarFan className="size-4  opacity-40" />
                  <span className="text-sm">{t("reserveRoom.items.3")}</span>
                </div>
              )}

              {has_tv && (
                <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                  <IconDeviceTv className="size-4  opacity-40" />
                  <span className="text-sm">{t("reserveRoom.items.4")}</span>
                </div>
              )}

              <div className="w-full flex justify-center items-center">
                <IconChevronDown
                  className={`size-4 cursor-pointer ${
                    seeFeatures ? "-rotate-180" : ""
                  } transition-all`}
                  onClick={() => setSeeFeatures(!seeFeatures)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="max-md:w-full h-[60px] overflow-y-hidden relative">
          <div className="flex flex-col justify-center items-center gap-2">
            {has_wifi && (
              <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                <IconWifi className="size-4  opacity-40" />
                <span className="text-sm">{t("reserveRoom.items.1")}</span>
              </div>
            )}

            {has_air_conditioning && (
              <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                <IconSnowflake className="size-4  opacity-40" />
                <span className="text-sm">{t("reserveRoom.items.2")}</span>
              </div>
            )}

            {has_balcony && (
              <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                <IconCarFan className="size-4  opacity-40" />
                <span className="text-sm">{t("reserveRoom.items.3")}</span>
              </div>
            )}

            {has_tv && (
              <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                <IconDeviceTv className="size-4  opacity-40" />
                <span className="text-sm">{t("reserveRoom.items.4")}</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <IconChevronDown
            className={`size-4 cursor-pointer ${
              seeFeatures ? "-rotate-180" : ""
            } transition-all`}
            onClick={() => setSeeFeatures(!seeFeatures)}
          />
        </div>
      </div>
    </div>
  );
}
