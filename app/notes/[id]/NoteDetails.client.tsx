"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

interface Props {
  id: string;
}

const NoteDetailsClient = ({ id }: Props) => {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load note</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <span>{data.tag}</span>
    </div>
  );
};

export default NoteDetailsClient;
