import css from "./NoteForm.module.css";

export default function NoteForm() {
  async function createNoteAction(formData: FormData) {
    "use server";

    const title = formData.get("title");
    const content = formData.get("content");
    const tag = formData.get("tag");

    console.log({ title, content, tag });
  }

  return (
    <>
      <form action={createNoteAction} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required className={css.input} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </form>
    </>
  );
}

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import type { NoteMin } from "../../types/note";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import type { FormikHelpers } from "formik";
// import { createNote } from "@/lib/api";

// interface NoteFormProps {
//   onClose: () => void;
// }

// const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

// const initialValues: NoteMin = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// const validationSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 charecters")
//     .max(50, "Too long title")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Too long content"),
//   tag: Yup.string()
//     .oneOf(TAGS, "Invalid tag value")
//     .required("Tag is required"),
// });
