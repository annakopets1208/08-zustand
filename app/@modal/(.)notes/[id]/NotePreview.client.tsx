"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import Error from "@/app/notes/[id]/error";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <>
      <Modal onClose={handleClose}>
        {isError && <Error error={error} />}
        {isLoading && <p>Loading, please wait...</p>}
        {data && (
          <div className={css.container}>
            <div className={css.item}>
              <button className={css.backBtn} onClick={handleClose}>
                Back
              </button>
              <div className={css.header}>
                <h2>{data?.title}</h2>
              </div>
              <p className={css.content}>{data?.content}</p>
              <p className={css.date}>{data?.createdAt}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NotePreviewClient;

// export default function NotePreview() {
//   const router = useRouter();
//   const { id } = useParams<{ id: string }>();

//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });

//   return (
//     <Modal onClose={() => router.back()}>
//       <div className={css.container}>
//         <button className={css.backBtn} onClick={() => router.back()}>
//           Back
//         </button>

//         {isLoading && <p>Loading note...</p>}
//         {error && <p>Failed to load note</p>}

//         {note && (
//           <div className={css.item}>
//             <h2>{note.title}</h2>
//             <p className={css.content}>{note.content}</p>
//             <span className={css.tag}>{note.tag}</span>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// }
