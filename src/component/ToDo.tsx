import { categoriesState, ToDoAtom, toDosState } from "../atom/to-do";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { darken } from "polished";

const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 8px;
  padding: 10px 8px;
  background-color: ${(props) => darken(0.1, props.theme.bgColor)};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  word-break: break-all;
`;

const TaskContents = styled.div`
  display: flex;
  justify-content: start;
  align-items: baseline;
  margin-right: 8px;
  flex: 1;

  button {
    margin-right: 8px;
  }
`;

const TaskCategory = styled.div`
  font-size: 0.8em;
`;

const TaskTitle = styled.div`
  margin: 24px 0 8px;
  color: ${(props) => darken(0.1, props.theme.accentColor)};
`;

const TaskController = styled.div`
  text-align: right;
`;

function ToDo({ id, contents, category }: ToDoAtom) {
  const setToDos = useSetRecoilState(toDosState);
  const categories = useRecoilValue(categoriesState);

  const onClickChangeCategoryButton = (categoryId: ToDoAtom["category"]["id"]) => {
    setToDos((toDos) => {
      const toDoIndex = toDos.findIndex((toDo) => toDo.id === id);
      const newCategory = categories.find((category) => category.id === categoryId)
        ?? toDos[toDoIndex].category;
      const newToDo = { ...toDos[toDoIndex], category: newCategory };

      return [ ...toDos.slice(0, toDoIndex), newToDo, ...toDos.slice(toDoIndex + 1) ];
    });
  };

  const onClickRemoveButton = () => {
    setToDos((toDos) => {
      const toDoIndex = toDos.findIndex((toDo) => toDo.id === id);

      return [ ...toDos.slice(0, toDoIndex), ...toDos.slice(toDoIndex + 1) ];
    });
  };

  return (
    <Task>
      <TaskContents>
        <button onClick={onClickRemoveButton}>&times;</button>
        <div>
          <TaskCategory>{category.name}</TaskCategory>
          <TaskTitle>
            {contents}
          </TaskTitle>
        </div>
      </TaskContents>
      <TaskController>
        {categories.map((aCategory) => (aCategory.id !== category.id && (
          <div key={aCategory.id}>
            <button onClick={() => onClickChangeCategoryButton(aCategory.id)}>&rarr; {aCategory.name}</button>
          </div>
        )))}
      </TaskController>
    </Task>
  );
}

export default ToDo;
