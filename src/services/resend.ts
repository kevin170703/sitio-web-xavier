// Frontend (por ejemplo, un componente o archivo donde desees llamar a la API)
export async function sendEmail({
  name,
  lastname,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  message: string;
  lastname: string;
  phone: string;
}) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Aquí puedes incluir datos adicionales si lo necesitas
        name,
        lastname,
        email,
        phone,
        message,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}
