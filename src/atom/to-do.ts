import { atom, selector } from "recoil";

export enum DefaultToDoCategoryName {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface ToDoCategoryAtom {
  id: string;
  name: string;
}

export interface ToDoAtom {
  id: string;
  contents: string;
  category: ToDoCategoryAtom;
}

const defaultToDoCategories: ToDoCategoryAtom[] = Object.values(DefaultToDoCategoryName).map((categoryName) => ({
  id: categoryName,
  name: categoryName,
}));

export const toDosState = atom<ToDoAtom[]>({
  key: "toDos",
  default: JSON.parse(window.localStorage.getItem("toDos") || JSON.stringify([])),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        window.localStorage.setItem("toDos", JSON.stringify(newValue));
      });
    },
  ],
});

export const categoriesState = atom<ToDoCategoryAtom[]>({
  key: "categories",
  default: JSON.parse(window.localStorage.getItem("categories")
    || JSON.stringify(defaultToDoCategories)),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        window.localStorage.setItem("categories", JSON.stringify(newValue));
      })
    },
  ],
});

export const selectedCategoryState = atom<ToDoCategoryAtom>({
  key: "selectedCategory",
  default: JSON.parse(window.localStorage.getItem("selectedCategory") || JSON.stringify(defaultToDoCategories[0])),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        window.localStorage.setItem("selectedCategory", JSON.stringify(newValue));
      });
    },
  ],
});

export const showingToDosSelector = selector({
  key: "showingToDos",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const selectedCategory = get(selectedCategoryState);

    return toDos.filter((toDo) => toDo.category.id === selectedCategory.id);
  },
})
