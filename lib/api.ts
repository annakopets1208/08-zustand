import axios from "axios";
import type { Note, NoteMin } from "../types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface fullResp {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  title?: string,
  page?: number,
  category?: string | undefined
) => {
  const response = await axios.get<fullResp>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search: title,
        perPage: 12,
        page,
        tag: category,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return response.data;
};

export const createNote = async (note: NoteMin): Promise<Note> => {
  const createResp = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes/",
    note,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return createResp.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${myKey}` },
    }
  );
  return res.data;
};
