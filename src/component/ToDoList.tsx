import { useForm } from "react-hook-form";

interface ToDoFormData {
  toDo: string;
}

function ToDoList() {
  const {
    register, setValue, handleSubmit, watch,
    formState: { errors }
  } = useForm<ToDoFormData>({
    defaultValues: {
      toDo: "",
    }
  });
  const watchFormData = watch();

  const onSubmit = (data: ToDoFormData) => {
    window.alert(data.toDo);
    setValue("toDo", "");
  };

  console.log(watchFormData);

  return (
    <div>
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
    </div>
  );
}

export default ToDoList;
