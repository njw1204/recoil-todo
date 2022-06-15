import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDosState } from '../atom/to-do';

interface ToDoFormData {
  toDo: string;
}

function ToDoCreator() {
  const setToDos = useSetRecoilState(toDosState);

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<ToDoFormData>({
    defaultValues: {
      toDo: "",
    },
  });

  const onSubmit = (data: ToDoFormData) => {
    setToDos((toDos) => [{ id: Math.random().toString(16).slice(2), category: "TODO", contents: data.toDo }, ...toDos]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", {
          required: "Please enter a To Do",
          maxLength: {
            value: 20,
            message: "Max 20 characters allowed"
          }
        })}
        placeholder="Write a To Do..."
        autoComplete="off"/>
      <button>Add</button>
      <div style={{ color: "#f00" }}>
        {errors.toDo?.message}
      </div>
  </form>
  );
}

export default ToDoCreator;
