// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { fetchNoteById } from "@/lib/api";
// import type { Note } from "@/types/note";

// interface Props {
//   id: string;
// }

// const NoteDetailsClient = ({ id }: Props) => {
//   const { data, isLoading, isError } = useQuery<Note>({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !data) return <p>Failed to load note</p>;

//   return (
//     <div>
//       <h2>{data.title}</h2>
//       <p>{data.content}</p>
//       <span>{data.tag}</span>
//     </div>
//   );
// };

// export default NoteDetailsClient;

"use client";

import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Error from "./error";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isError && <Error error={error} />}
      {isLoading && <p>Loading, please wait...</p>}
      {data && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <p className={css.content}>{data?.content}</p>
            <p className={css.date}>{data?.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteDetailsClient;
