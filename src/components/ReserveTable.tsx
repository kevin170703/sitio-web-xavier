import { Table } from "@/page/DetailTable";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { useState, FC, FormEvent } from "react";
import CardTableRecomended from "./CardTableRecomended";
import { useTranslations } from "next-intl";

interface ReserveProps {
  roomAvailable: boolean | null;
  id: string;
  date_reservations: string;
  start_time: string;
  end_time: string;
  number_persons: number;
  avilabelTables: Table[];
  setRoomAvailable: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const ReserveTable: FC<ReserveProps> = ({
  roomAvailable,
  id,
  date_reservations,
  start_time,
  end_time,
  number_persons,
  avilabelTables,
  setRoomAvailable,
}) => {
  const t = useTranslations();

  const [dataTable, setDataTable] = useState({
    id: id,
  });
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
      tableId: dataTable.id,
      fullName,
      email,
      telefono,
    };

    const { data } = await axios.post(
      `https://reservations-uty9.onrender.com/api/restaurant-reservations`,
      {
        customer_full_name: reservaData.fullName,
        customer_email: reservaData.email,
        customer_phone: reservaData.telefono,
        table_id: Number(reservaData.tableId),
        reservation_date: date_reservations,
        start_time: start_time,
        end_time: end_time,
        number_of_people: number_persons,
        reservation_status_id: 1,
      }
    );

    if (data.success) {
      setMensaje(`Thank you ${fullName}, your reservation has been sent.`);
    }

    setFullName("");
    setEmail("");
    setTelefono("");
    setErrors({});
  };

  async function changueTable({ id }: { id: string }) {
    setDataTable({
      id,
    });
    // setTimeout(() => {
    setRoomAvailable(true);
    // }, 1000);
  }

  if (roomAvailable === null) return null;

  return (
    <section className="absolute top-0 left-0 w-full h-full  backdrop-blur-xs flex flex-col justify-center items-center p-6 z-20">
      {roomAvailable ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black p-6 rounded-2xl shadow-md w-100 relative max-w-full"
          noValidate
        >
          <button
            onClick={() => setRoomAvailable(null)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <IconX />
          </button>

          <p className="mb-4">
            <strong>{date_reservations}</strong> | <strong>{start_time}</strong>{" "}
            - <strong>{end_time}</strong>
          </p>

          <label className="w-full h-max space-y-2">
            {t("reserveTable.form.1.name")}
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              className={`w-full border-black/10 rounded-xl outline-none px-4 py-2 border mb-6 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              required
              placeholder={t("reserveTable.form.1.placeholder")}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
            )}
          </label>

          <label className="w-full h-max space-y-2">
            {t("reserveTable.form.2.name")}
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full border-black/10 rounded-xl outline-none px-4 py-2 border mb-6 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
              placeholder={t("reserveTable.form.2.placeholder")}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </label>

          <label className="w-full h-max space-y-2">
            {t("reserveTable.form.3.name")}
            <input
              type="tel"
              value={telefono}
              onChange={handleTelefonoChange}
              className={`w-full border-black/10 rounded-xl outline-none px-4 py-2 border mb-6 ${
                errors.telefono ? "border-red-500" : "border-gray-300"
              }`}
              required
              placeholder={t("reserveTable.form.3.placeholder")}
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
        <div className="bg-white text-black px-6 py-16 rounded-2xl shadow-md w-max relative max-w-full">
          <button
            onClick={() => setRoomAvailable(null)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <IconX />
          </button>

          <p className="text-2xl text-center">
            {t("reserveTable.notAvailableMessage")}
          </p>

          {avilabelTables.length >= 1 && (
            <div>
              <p className="text-xl font-medium pb-4">
                {t("reserveTable.availableTableMessage")}
              </p>
              <div className="space-y-4 flex flex-col justify-center items-center">
                {avilabelTables.map((table) => (
                  <CardTableRecomended
                    location={table.location}
                    changueTable={changueTable}
                    capacity={table.capacity}
                    tableNumber={table.table_number}
                    id={table.id}
                    key={table.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ReserveTable;
