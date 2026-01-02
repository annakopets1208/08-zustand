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
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      setName(event.target.value);
    },
    500
  );

  const { data } = useQuery({
    queryKey: ["notes", { page: currentPage, searchValue: name, tag }],
    queryFn: () => fetchNotes(name, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data?.notes && data.notes.length > 0 ? (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <p>No notes found</p>
      )}
    </div>
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
