import type { Todo } from "./App";
import { createContext } from "react";

interface TodoContextType {
  todos: Todo[];
  onCreate: (content: string) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  onCreate: (content: string) => {},
  onUpdate: (id: number) => {},
  onDelete: (id: number) => {},
});

export default TodoContext;
