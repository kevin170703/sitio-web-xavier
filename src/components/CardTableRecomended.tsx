import { IconMapPin, IconUsers } from "@tabler/icons-react";
import React, { useState } from "react";

export default function CardTableRecomended({
  id,
  capacity,
  tableNumber,
  location,
  changueTable,
}: {
  id: number;
  capacity: number;
  tableNumber: string;
  location: string;
  changueTable: ({ id }: { id: string }) => void;
}) {
  const [seeFeatures, setSeeFeatures] = useState(false);

  return (
    <div
      className="w-[300px] min-h-[100px] rounded-2xl flex flex-col  justify-center items-center shadow-2xl p-4"
      key={id}
    >
      <div className="w-max flex justify-start items-center gap-4">
        <div className="h-full flex flex-col justify-between items-start gap-4">
          <p className="text-2xl font-medium">Table {tableNumber}</p>
        </div>
      </div>

      {/* {seeFeatures && (
          <div className="absolute top-[26px] left-1/2 -translate-x-1/2 w-max bg-white rounded-xl p-4 z-10 shadow-2xl">
            <div className="flex flex-col justify-center items-center gap-2">
              {has_wifi && (
                <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                  <IconWifi className="size-4  opacity-40" />
                  <span className="text-sm">Wi-Fi</span>
                </div>
              )}

              {has_air_conditioning && (
                <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                  <IconSnowflake className="size-4  opacity-40" />
                  <span className="text-sm">Air conditioning</span>
                </div>
              )}

              {has_balcony && (
                <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                  <IconCarFan className="size-4  opacity-40" />
                  <span className="text-sm">With balcony</span>
                </div>
              )}

              {has_tv && (
                <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
                  <IconDeviceTv className="size-4  opacity-40" />
                  <span className="text-sm">With TV</span>
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
        )} */}

      <div className="h-[60px] overflow-y-hidden relative flex justify-center items-center gap-2">
        <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
          <IconUsers className="size-4 opacity-40" />
          <p className="-mb-1">{capacity}</p>
        </div>

        {location && (
          <div className="w-full flex justify-between items-center gap-2 bg-black/5 rounded-full px-2 py-0.5">
            <IconMapPin className="size-4  opacity-40" />
            <span className="text-sm">{location}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        className="w-full text-center bg-primary rounded-full p-1 cursor-pointer"
        onClick={() =>
          changueTable({
            id: id.toString(),
          })
        }
      >
        <p className="px-4 text-white text-base">Book now</p>
      </button>
    </div>
  );
}
