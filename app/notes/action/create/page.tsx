import CreateNoteClient from "./CreateNote.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create note",
    description: "Create a new note in NoteHub",
    url: "https://07-routing-nextjs-rust-nu.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note",
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNoteClient />;
}
