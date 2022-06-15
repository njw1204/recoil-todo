import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoriesState,
  DefaultToDoCategoryName,
  selectedCategoryState,
  showingToDosSelector,
  toDosState
} from "../atom/to-do";
import ToDo from "./ToDo";
import ToDoCreator from "./ToDoCreator";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../style/form-error";
import styled from "styled-components";
import { getRandomId } from "../util/to-do-util";

interface CategoryFormData {
  categoryName: string;
}

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const CategorySelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ToDoList() {
  const setToDos = useSetRecoilState(toDosState);
  const toDos = useRecoilValue(showingToDosSelector);
  const [ categories, setCategories ] = useRecoilState(categoriesState);
  const [ selectedCategory, setSelectedCategory ] = useRecoilState(selectedCategoryState);
  const {
    register: registerCategoryForm,
    watch: watchCategoryForm,
    setValue: setCategoryFormValue,
    setError: setCategoryFormError,
    handleSubmit: handleCategoryFormSubmit,
    formState: { errors: categoryFormErrors }
  } = useForm<CategoryFormData>({
    defaultValues: {
      categoryName: "",
    },
  });
  const categoryFormWatch = watchCategoryForm();
  const isDefaultCategory = Object.values<string>(DefaultToDoCategoryName).includes(selectedCategory.name);

  if (categoryFormWatch.categoryName !== categoryFormWatch.categoryName.toUpperCase()) {
    setCategoryFormValue("categoryName", categoryFormWatch.categoryName.toUpperCase());
  }

  const onInputCategoriesSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    const category = categories.find((category) => category.id === event.currentTarget.value);

    if (category) {
      setSelectedCategory(category);
    }
  };

  const onClickRemoveCategoryButton = () => {
    if (isDefaultCategory) {
      return;
    }

    setToDos((currToDos) => {
      return currToDos.filter((toDo) => toDo.category.id !== selectedCategory.id);
    });
    setCategories((currCategories) => {
      const removedCategoryIndex = currCategories.findIndex((category) =>
        category.id === selectedCategory.id);

      return [ ...currCategories.slice(0, removedCategoryIndex), ...currCategories.slice(removedCategoryIndex + 1) ];
    });
    setSelectedCategory(categories[categories.findIndex((category) =>
      category.id === selectedCategory.id) - 1]);
  };

  const onSubmitAddCategoryForm = (data: CategoryFormData) => {
    if (categories.find((category) =>
      category.name.toUpperCase() === data.categoryName.toUpperCase())) {
      setCategoryFormError("categoryName", {
        message: "The category already exists",
      }, {
        shouldFocus: true,
      });
      return;
    }

    const newCategory = {
      id: getRandomId(),
      name: data.categoryName.toUpperCase(),
    };

    setCategories((currCategories) => {
      return [ ...currCategories, newCategory ];
    });

    setCategoryFormValue("categoryName", "");
  };

  return (
    <div>
      <CategoryContainer>
        <CategorySelectContainer>
          <select onInput={onInputCategoriesSelect} value={selectedCategory.id}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {!isDefaultCategory && <button onClick={onClickRemoveCategoryButton}>&times;</button>}
        </CategorySelectContainer>
        <form onSubmit={handleCategoryFormSubmit(onSubmitAddCategoryForm)}>
          <input
            {...registerCategoryForm("categoryName", {
              required: "Please enter a category",
              maxLength: {
                value: 10,
                message: "Max 10 characters are allowed",
              },
            })}
            placeholder="Enter a Category..."
            autoComplete="off"/>
          <button>Add</button>
          <FormError>
            {categoryFormErrors.categoryName?.message}
          </FormError>
        </form>
      </CategoryContainer>
      <ToDoCreator/>
      {toDos.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
    </div>
  );
}

export default ToDoList;
