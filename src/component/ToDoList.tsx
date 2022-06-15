import { useRecoilValue } from "recoil";
import { toDosState } from "../atom/to-do";
import ToDo from "./ToDo";
import ToDoCreator from "./ToDoCreator";

function ToDoList() {
  const toDos = useRecoilValue(toDosState);

  return (
    <div>
      <ToDoCreator/>
      {toDos.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
    </div>
  );
}

export default ToDoList;
