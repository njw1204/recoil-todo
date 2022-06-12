import React, { useState } from "react";

function ToDoList() {
  const [toDoInputValue, setToDoInputValue] = useState("");

  const onChangeToDoInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = event;
    setToDoInputValue(value);
  };

  const onSubmitToDoAddForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDoInputValue);
  };

  return (
    <div>
      <form onSubmit={onSubmitToDoAddForm}>
        <input onChange={onChangeToDoInput} value={toDoInputValue} placeholder="Write here..."/>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
