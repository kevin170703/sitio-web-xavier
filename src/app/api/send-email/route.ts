// src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function POST(req: Request) {
  const { name, email, message, phone, lastname } = await req.json();

  try {
    await resend.emails.send({
      from: "Les P'tits Lofts Du Lac <onboarding@resend.dev>",
      to: [""],
      subject: "Contact message - Les P'tits Lofts Du Lac",
      html: `
      <div>
        <p>Name: ${name} ${lastname}</p>
          <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
      </div>
      `,
    });

    // Simular el retraso de 2 segundos
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulación exitosa de envío de correo
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = JSON.stringify(error);
    }

    return NextResponse.json(
      {
        message: "Error sending email",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
