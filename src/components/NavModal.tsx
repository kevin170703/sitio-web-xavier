import { IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface SubServices {
  name: string;
  slugify: string;
}

export default function NavModal({
  subServices,
  service,
}: {
  subServices: SubServices[];
  service: string;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [viewServices, setViewServices] = useState<boolean>(false);

  const [selectLink, setSelectLink] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setViewServices(false); // Cerrar el menú si el clic es fuera de él
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (pathname) {
      const divideUrl = pathname.split("/");
      setSelectLink(divideUrl[divideUrl.length - 2] || "/");
    }
  }, [pathname]);

  return (
    <div
      onMouseEnter={() => setViewServices(true)}
      onMouseLeave={() => setViewServices(false)}
      className="relative cursor-pointer"
    >
      <Link
        href={`/services/${subServices[0].slugify}`}
        className={`${
          service.toLocaleLowerCase() === selectLink
            ? " border-primary"
            : "border-transparent"
        } border-b-2 active:scale-95 transition-all hover:opacity-70 hover:text-lg text-base font-medium`}
      >
        {service}
      </Link>

      <AnimatePresence>
        {subServices.length > 0 && viewServices && (
          <div
            ref={menuRef}
            className="absolute w-max top-[100%] left-0 bg-white text-black p-4 flex flex-col gap-2 rounded-xl border border-black/10 z-50"
          >
            {subServices.map((subService, index) => (
              <Link
                key={index}
                href={`/services/${subService.slugify}`}
                className="box-border group transition-all flex justify-start items-center gap-2 hover:text-primary hover:font-semibold"
                onClick={() => setViewServices(false)} // Cerrar el menú después de hacer clic
              >
                {subService.name}
                <IconChevronRight className="opacity-0 group-hover:opacity-100 transition-all " />
              </Link>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
