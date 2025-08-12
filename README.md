# Les P'tits Lofts Du Lac

Official website of **Les P'tits Lofts Du Lac**, developed with modern technologies to provide a fast, accessible, and visually appealing experience.

## 🚀 Technologies Used

- **Next.js** 15 – React framework for SSR and static generation.
- **TypeScript** – Static typing.
- **Tailwind CSS** – Utility-first CSS framework.
- **Tabler Icons** – Icon set for React.
- **Framer Motion** – Smooth animations for React.
- **Resend** – Email sending service.

## This project follows the standard Next.js folder convention

## 🛠️ Available Scripts

In the project directory, you can run:

- `npm run dev` – Runs the development server with Turbopack at `http://localhost:3000`.
- `npm run build` – Builds the app for production.
- `npm start` – Starts the production server at `http://localhost:3000`.
- `npm run lint` – Runs the linter (ESLint).

> The application runs by default on port **3000**. You can change it using the `PORT` environment variable.

## 📧 Emails with Resend

The project uses [Resend](https://resend.com) for sending emails. Be sure to set your API Key as an environment variable in `.env`:

```env
NEXT_PUBLIC_RESEND_API_KEY=your_secret_key
```
