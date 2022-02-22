import { Todo } from "../useReducer/types";

const setItem = (arr: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(arr));
};

const getItem = () => {
  return JSON.parse(localStorage.getItem("todos") || "[]");
};

export { setItem, getItem };
