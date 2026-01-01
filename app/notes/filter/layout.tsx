import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </section>
  );
};

export default NotesLayout;
