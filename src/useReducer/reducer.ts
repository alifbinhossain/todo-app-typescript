import { setItem } from "../States/localStorage";
import { ActionType, Todo } from "./types";

const reducer = (state: Todo[], action: ActionType) => {
  switch (action.type) {
    case "ADD":
      setItem([
        ...state,
        {
          id: state.length,
          text: action.text,
        },
      ]);
      return [
        ...state,
        {
          id: state.length,
          text: action.text,
        },
      ];
    case "REMOVE":
      setItem(state.filter(({ id }) => id !== action.id));
      return state.filter(({ id }) => id !== action.id);
  }
};

export default reducer;
