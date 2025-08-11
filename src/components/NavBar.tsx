"use client";

import {
  IconClockHour10Filled,
  IconExclamationMark,
  IconHome,
  IconMapPinFilled,
  IconMenu2,
  IconMessage,
  IconPhoneFilled,
  IconTrendingUp,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);

  const [selectLink, setSelectLink] = useState("");

  const [scrolled, setScrolled] = useState(false);

  const [viewServicesPhone, setViewServicesPhone] = useState<boolean>(false);

  useEffect(() => {
    if (pathname) {
      const divideUrl = pathname.split("/");
      setSelectLink(divideUrl[divideUrl.length - 1] || "/");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.15,
        ease: [0.25, 0.5, 0.75, 1], // Easing personalizado para más fluidez
      }}
      className={`w-dvw h-max fixed flex  items-center justify-between px-20 max-md:px-5 z-[1000]  top-0
        ${
          scrolled
            ? "bg-primary text-white border-white py-4"
            : selectLink === "/" || selectLink === "/terms-of-use"
            ? "bg-white text-black py-4"
            : "bg-white text-black py-4"
        }
        
        `}
    >
      <Link
        href={"/"}
        className={`${scrolled ? "h-10 " : "h-12"} pr-10  max-lg:pr-0 `}
      >
        Logo
        {/* <LogoMissim
          variant={scrolled ? "white" : selectLink === "/" ? "normal" : "white"}
        /> */}
      </Link>

      <div className="flex-1 ">
        <div
          className={`w-full mb-3 pb-2 flex justify-center items-center max-2xl:pr-0 gap-10 border-b border-[#ebebeb] max-lg:hidden pr-30 ${
            scrolled && "hidden"
          } ${selectLink === "/" ? "text-black" : "text-black"}`}
        >
          {/* <div className="flex justify-start items-center gap-2">
            <IconClockHour10Filled className={`text-primary w-5 h-auto`} />
            <p className="text-sm max-xl:text-xs">8:00am - 8:00pm</p>
          </div> */}

          <div className="flex justify-start items-center gap-2">
            <IconMapPinFilled className={`text-primary w-5 h-auto`} />
            <p className="text-sm max-xl:text-xs">
              108 Avenue de Venise O, Venise-en-Québec, QC J0J 2K0, Canadá
            </p>
          </div>

          <div className="flex justify-start items-center gap-2">
            <IconPhoneFilled className={`text-primary w-5 h-auto`} />
            <p className="text-sm max-xl:text-xs">+1 450-244-6287</p>
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex items-center justify-center gap-36 flex-1 max-2xl:pr-0 ">
            <nav
              className={`flex items-center space-x-10 text-sm max-lg:hidden${
                selectLink === "/" && !scrolled ? "text-black" : "text-white"
              }`}
            >
              <Link
                href={"/"}
                className={`${
                  selectLink === "about"
                    ? " border-white"
                    : "border-transparent"
                } 
            active:scale-95 transition-all font-medium border-b-2  hover:opacity-70 text-lg`}
              >
                Home
              </Link>

              <Link
                href={"/menu"}
                className={`${
                  selectLink === "about"
                    ? " border-white"
                    : "border-transparent"
                } 
            active:scale-95 transition-all font-medium border-b-2  hover:opacity-70 text-lg`}
              >
                Menu
              </Link>

              <Link
                href={"/#rooms"}
                className={`${
                  selectLink === "about"
                    ? " border-white"
                    : "border-transparent"
                } 
            active:scale-95 transition-all font-medium border-b-2  hover:opacity-70 text-lg`}
              >
                Rooms
              </Link>
            </nav>
          </div>

          <IconMenu2
            className={`hidden w-10 h-10 max-lg:block ${
              scrolled
                ? "text-white"
                : selectLink === "/"
                ? "text-black"
                : "text-white"
            }`}
            onClick={() => setOpenMenu(!openMenu)}
          />

          <div className="flex justify-end items-center gap-5 max-lg:hidden">
            <Link
              href={"/contact"}
              className="border border-primary flex justify-center items-center gap-2  text-primary px-4 py-2 rounded-xl hover:scale-105 transition-all active:scale-100"
            >
              Contact us
            </Link>

            {/* <ButtonReservations scrolled={scrolled} /> */}

            {/* <Link href={"/contact"}>
              <Button
                text={t("NavBar.linkContact")}
                color={scrolled ? "white" : "primary"}
              />
            </Link> */}

            {/* <SelectLanguage scrolled={scrolled} selectLink={selectLink} /> */}
          </div>
        </div>
      </div>

      <div
        className={`w-full h-dvh fixed z-50 top-0 left-0  bg-black/50 flex justify-end ${
          openMenu ? "visible" : "invisible"
        } transition-opacity duration-500`}
        onClick={() => setOpenMenu(false)} // Cierra el menú si se hace clic en el área exterior
      >
        <div
          className={`flex flex-col justify-between items-start gap-10 text-lg max-w-[250px] bg-primary text-white pl-5 py-10 rounded-l-2xl shadow-2x transform transition-transform duration-500 ease-in-out ${
            openMenu ? "translate-x-0" : "translate-x-full"
          } ${viewServicesPhone ? "w-[70%]" : "w-[55%]"} `}
          onClick={(e) => e.stopPropagation()} // Previene que el clic cierre el menú al hacer clic dentro del contenido
        >
          <div className="w-full flex justify-between items-center pr-5">
            <div className="w-[70%]">
              Logo
              {/* <LogoMissim variant={"white"} /> */}
            </div>

            {/* <SelectLanguage scrolled={true} selectLink={"/services"} /> */}
          </div>

          <nav className="flex flex-1 w-full flex-col items-start justify-center space-y-4 text-base ">
            <Link
              href={"/"}
              className={`flex items-center gap-2 py-2 rounded-l-[16px] w-full active:scale-95 transition-all ${
                selectLink === "/"
                  ? "bg-white text-primary pl-2"
                  : "bg-transparent"
              }`}
            >
              <IconHome className="w-6 h-6" stroke={1.5} />
              Home
            </Link>

            <div
              onClick={() => setViewServicesPhone(!viewServicesPhone)}
              className="relative cursor-pointer w-full"
            >
              <button
                className={`flex items-center gap-2 py-2 rounded-l-[16px] w-full active:scale-95 transition-all
                  ${
                    pathname?.split("/")[1] === "services"
                      ? "bg-white text-primary pl-2"
                      : "bg-transparent"
                  } `}
              >
                <IconTrendingUp className="w-6 h-6" stroke={1.5} />
              </button>
            </div>

            <Link
              href={"/about"}
              className={`flex items-center gap-2 py-2 rounded-l-[16px] w-full active:scale-95 transition-all ${
                selectLink === "about"
                  ? "bg-white text-primary pl-2"
                  : "bg-transparent"
              }`}
            >
              <IconExclamationMark className="w-6 h-6" stroke={1.5} />
              About
            </Link>

            <Link
              href={"/contact"}
              className={`flex items-center gap-2 py-2 rounded-l-[16px] w-full active:scale-95 transition-all ${
                selectLink === "contact"
                  ? "bg-white text-primary pl-2"
                  : "bg-transparent"
              }`}
            >
              <IconMessage className="w-6 h-6" stroke={1.5} />
            </Link>
          </nav>
        </div>
      </div>
    </motion.nav>
  );
}
