"use client";

import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const category = tag === "all" ? undefined : tag;

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      setName(event.target.value);
    },
    500
  );

  const { data } = useQuery({
    queryKey: ["notes", name, currentPage, tag],
    queryFn: () => fetchNotes(name, currentPage, category),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={handleChange} />
          {data?.notes?.length !== 0 && (data?.totalPages ?? 0) > 1 && (
            <Pagination
              totalPages={data?.totalPages ?? 0}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <Link className={css.button} href={"/notes/action/create"}>
            Create note +
          </Link>
        </header>
        {data?.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
      </div>
    </>
  );
}
