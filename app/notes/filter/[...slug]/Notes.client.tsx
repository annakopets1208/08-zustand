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
  slug: string[];
}

export default function NotesClient({ slug }: NotesClientProps) {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const category = slug?.[0] === "all" ? undefined : slug?.[0];

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      setName(event.target.value);
    },
    500
  );

  const { data } = useQuery({
    queryKey: ["notes", name, currentPage, slug?.[0]],
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
        <NoteList notes={data?.notes ?? []} />
      </div>
    </>
  );
}

// "use client";
// import css from "./NotesPage.module.css";
// import { fetchNotes } from "@/lib/api";
// import { useState } from "react";
// import { useDebouncedCallback } from "use-debounce";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import SearchBox from "@/components/SearchBox/SearchBox";
// import NoteList from "@/components/NoteList/NoteList";
// import Pagination from "@/components/Pagination/Pagination";
// import Modal from "@/components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
// import Link from "next/link";

// interface NotesClientProps {
//   tag: string;
// }

// export default function NotesClient({ tag }: NotesClientProps) {
//   const [name, setName] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleChange = useDebouncedCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setCurrentPage(1);
//       setName(event.target.value);
//     },
//     500
//   );

//   const { data } = useQuery({
//     queryKey: ["notes", { page: currentPage, searchValue: name, tag: tag }],
//     queryFn: () => fetchNotes(name, currentPage, tag),
//     placeholderData: keepPreviousData,
//   });

//   return (
//     <>
//       <div className={css.app}>
//         <header className={css.toolbar}>
//           <SearchBox onChange={handleChange} />
//           {data?.totalPages && data.totalPages > 1 && (
//             <Pagination
//               totalPages={data?.totalPages}
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//             />
//           )}
//           <button className={css.button} onClick={() => setIsModalOpen(true)}>
//             Create note +
//           </button>
//         </header>
//         {data?.notes && data.notes.length > 0 ? (
//           <NoteList notes={data.notes} />
//         ) : (
//           <p>No notes found</p>
//         )}
//         {isModalOpen && (
//           <Link onClose={() => setIsModalOpen(false)}>
//             <NoteForm onClose={() => setIsModalOpen(false)} />
//           </Link>
//         )}
//       </div>
//     </>
//   );
// }
