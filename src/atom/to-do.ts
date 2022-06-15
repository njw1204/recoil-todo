import { atom } from "recoil";

export interface ToDoAtom {
  id: string;
  contents: string;
  category: "TODO" | "DOING" | "DONE";
}

export const toDosState = atom<ToDoAtom[]>({
  key: "toDos",
  default: [],
});
