import { ToDoAtom, toDosState } from "../atom/to-do";
import { useSetRecoilState } from 'recoil';

function ToDo({ id, contents, category }: ToDoAtom) {
  const setToDos = useSetRecoilState(toDosState);

  const onClickChangeCategoryButton = (category: ToDoAtom["category"]) => {
    setToDos((toDos) => {
      const toDoIndex = toDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {...toDos[toDoIndex], category };

      return [...toDos.slice(0, toDoIndex), newToDo, ...toDos.slice(toDoIndex + 1)];
    });
  };

  return (
    <div>
      {category}
      {" - "}
      {contents}
      {" "}
      {category !== "TODO" && <button onClick={() => onClickChangeCategoryButton("TODO")}>TODO</button>}
      {category !== "DOING" && <button onClick={() => onClickChangeCategoryButton("DOING")}>DOING</button>}
      {category !== "DONE" && <button onClick={() => onClickChangeCategoryButton("DONE")}>DONE</button>}
    </div>
  );
}

export default ToDo;