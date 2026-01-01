export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NoteMin {
  title: string;
  content: string;
  tag: NoteTag;
}

export type Category = {
  id: string;
  name: string;
};
