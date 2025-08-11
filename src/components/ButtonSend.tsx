import { IconCheck, IconLoader2, IconSend } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ButtonSend({
  text,
  onClick,
  disabled = false,
  width,
  loader = false,
  success = false,
}: {
  width?: "full" | "normal";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  loader?: boolean;
  success?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  console.log(loader, success);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`px-4 h-12 rounded-full border border-primary flex justify-center items-center gap-2 text-sm font-medium cursor-pointer active:scale-95 transition-all hover:scale-105  overflow-hidden bg-transparent text-primary relative min-w-[150px]`}
      style={{
        width: `${width === "full" && "100%"}`,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {!success && loader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loader ? 1 : 0, rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity, // Repetir infinitamente
          }}
        >
          <IconLoader2 />
        </motion.div>
      )}

      {!loader && success && (
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-primary rounded-full"
          initial={{ opacity: 0, scale: 0 }} // Inicia desde el centro con escala 0
          animate={{ opacity: success ? 1 : 0, scale: success ? 1.1 : 0 }} // Escala 1 para cubrir todo el contenedor
          transition={{
            duration: 0.6, // Duración de la animación
            ease: "easeInOut", // Efecto de suavizado
          }}
        >
          <IconCheck className="text-white" />
        </motion.div>
      )}

      {loader ||
      success ||
      (!loader && success) ||
      (loader && !success) ? null : (
        <p className="">{text}</p>
      )}

      {loader ||
      success ||
      (!loader && success) ||
      (loader && !success) ? null : (
        <div className="relative w-5 h-5">
          <motion.div
            initial={{ x: 0 }}
            animate={{
              rotate: hovered ? -45 : 0,
              x: hovered ? 20 : 0,
              y: hovered ? -20 : 0,
              opacity: hovered ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute to-0 left-0 w-5 h-5 "
          >
            <IconSend className="w-full h-full transition-all " />
          </motion.div>

          <motion.div
            initial={{ x: -20, y: 20, opacity: 1 }}
            animate={{
              x: hovered ? 0 : -20,
              y: hovered ? 0 : 20,
              opacity: !hovered ? 0 : 1,
            }}
            className="absolute to-0 left-0 w-5 h-5 "
            transition={{ duration: 0.4 }}
          >
            <IconSend className="w-full h-full transition-all group-hover:translate-x-100 " />
          </motion.div>
        </div>
      )}
    </button>
  );
}
