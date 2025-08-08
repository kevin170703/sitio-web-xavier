import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { useState, FC, FormEvent } from "react";

interface ReserveProps {
  roomAvailable: boolean | null;
  id: string;
  checkin: string;
  checkout: string;
  roomName: string;
  roomDescription?: string;
  price: string;
  setRoomAvailable: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Reserve: FC<ReserveProps> = ({
  roomAvailable,
  id,
  checkin,
  checkout,
  price,
  roomName,
  roomDescription,
  setRoomAvailable,
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    telefono?: string;
  }>({});

  const [mensaje, setMensaje] = useState<string>("");

  // Función para validar el formulario al enviar
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "El nombre completo es obligatorio.";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName =
        "El nombre completo debe tener al menos 3 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "El email no es válido.";
    }

    const telefonoRegex = /^[0-9]{7,}$/;
    if (!telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!telefonoRegex.test(telefono)) {
      newErrors.telefono =
        "El teléfono debe tener al menos 7 dígitos numéricos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler para Full Name que solo permite letras y espacios
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Solo letras (mayúsculas y minúsculas) y espacios
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFullName(value);
      if (errors.fullName) {
        setErrors((prev) => ({ ...prev, fullName: undefined }));
      }
    }
  };

  // Handler para Teléfono que solo permite números
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTelefono(value);
      if (errors.telefono) {
        setErrors((prev) => ({ ...prev, telefono: undefined }));
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setMensaje("");
      return;
    }

    const reservaData = {
      roomId: id,
      roomName,
      checkin,
      checkout,
      fullName,
      email,
      telefono,
    };

    const { data } = await axios.post(
      `https://reservations-uty9.onrender.com/api/hotel-reservations`,
      {
        customer_full_name: reservaData.fullName,
        customer_email: reservaData.email,
        customer_phone: reservaData.telefono,
        room_id: Number(reservaData.roomId),
        check_in_date: reservaData.checkin.replace(/\//g, "-"),
        check_out_date: reservaData.checkout.replace(/\//g, "-"),
        total_amount: price,
        reservation_status_id: 1,
      }
    );

    console.log(data, "data back");

    if (data.success) {
      setMensaje(`Thank you ${fullName}, your reservation has been sent.`);
    }

    setFullName("");
    setEmail("");
    setTelefono("");
    setErrors({});
  };

  if (roomAvailable === null) return null;

  return (
    <section className="absolute top-0 left-0 w-full h-full  backdrop-blur-xs flex flex-col justify-center items-center p-6">
      {roomAvailable ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black p-6 rounded-2xl shadow-md w-100 relative"
          noValidate
        >
          <button
            onClick={() => setRoomAvailable(null)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <IconX />
          </button>
          <h2 className="mb-2 text-2xl font-semibold">
            The room is available!
          </h2>

          <div className="">
            <p className="font-semibold text-xl">{roomName}</p>
            {roomDescription && (
              <p className="mb-4 text-sm text-gray-700">{roomDescription}</p>
            )}
          </div>

          <p className="mb-4">
            Dates: <strong>{checkin}</strong> a <strong>{checkout}</strong>
          </p>

          <label className="w-full h-max space-y-2">
            Full Name:
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              className={`w-full border-black/10 rounded-xl outline-none px-4 py-2 border mb-6 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              required
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
            )}
          </label>

          <label className="w-full h-max space-y-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full border-black/10 rounded-xl outline-none px-4 py-2 border mb-6 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </label>

          <label className="w-full h-max space-y-2">
            Phone:
            <input
              type="tel"
              value={telefono}
              onChange={handleTelefonoChange}
              className={`w-full border-black/10 rounded-xl outline-none px-4 py-2 border mb-6 ${
                errors.telefono ? "border-red-500" : "border-gray-300"
              }`}
              required
              placeholder="1 1234 5678910"
            />
            {errors.telefono && (
              <p className="text-red-600 text-sm mt-1">{errors.telefono}</p>
            )}
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-primary text-white py-3 cursor-pointer"
          >
            Book
          </button>
          {mensaje && <p className="mt-4 text-green-700">{mensaje}</p>}
        </form>
      ) : (
        <div className="bg-white text-black px-6 py-16 rounded-2xl shadow-md w-100 text-2xl text-center relative">
          <button
            onClick={() => setRoomAvailable(null)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <IconX />
          </button>

          <p>
            We&apos;re sorry, the room is not available on those dates. Please
            try another date.
          </p>
        </div>
      )}
    </section>
  );
};

export default Reserve;
