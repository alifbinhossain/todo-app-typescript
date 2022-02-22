export type Todo = {
  id: number;
  text: string;
};

export type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };
