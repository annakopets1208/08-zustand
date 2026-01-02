import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page not found",
  openGraph: {
    title: "Page not found",
    description: "This page not found",
    url: "https://notehub-public.goit.study/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — Page not found",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
