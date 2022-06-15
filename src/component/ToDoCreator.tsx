import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoriesState, selectedCategoryState, toDosState } from '../atom/to-do';
import { FormError } from '../style/form-error';
import styled from "styled-components";
import { getRandomId } from "../util/to-do-util";

interface ToDoFormData {
  toDo: string;
}

const TaskForm = styled.form`
  margin: 16px 0;
`;

const TaskInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TaskInput = styled.input.attrs({ placeholder: "Write a Task...", autoComplete: "off" })`
  flex: 1;
`;

function ToDoCreator() {
  const setToDos = useSetRecoilState(toDosState);
  const [ firstCategory ] = useRecoilValue(categoriesState);
  const selectedCategory = useRecoilValue(selectedCategoryState);

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<ToDoFormData>({
    defaultValues: {
      toDo: "",
    },
  });

  const onSubmit = (data: ToDoFormData) => {
    setToDos((toDos) => [
      { id: getRandomId(), category: selectedCategory ?? firstCategory, contents: data.toDo },
      ...toDos
    ]);
    setValue("toDo", "");
  };

  return (
    <TaskForm onSubmit={handleSubmit(onSubmit)}>
      <TaskInputContainer>
        <TaskInput
          {...register("toDo", {
            required: "Please write a task",
            maxLength: {
              value: 100,
              message: "Max 100 characters are allowed"
            },
          })}/>
        <button>Add</button>
      </TaskInputContainer>
      <FormError>
        {errors.toDo?.message}
      </FormError>
    </TaskForm>
  );
}

export default ToDoCreator;
