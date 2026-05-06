import { useCallback, useReducer, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import TodoContext from "./TodoContext";

const mockTodos = [
  {
    id: 0,
    isDone: false,
    content: "Javascript 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "AI 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
];

export interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  createDate: number;
}

type Action =
  | { type: "CREATE"; newItem: Todo }
  | { type: "UPDATE"; targetId: number }
  | { type: "DELETE"; targetId: number };

function reducer(todos: Todo[], action: Action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...todos];
    }
    case "UPDATE": {
      return todos.map((todo) =>
        todo.id === action.targetId ? { ...todo, isDone: !todo.isDone } : todo,
      );
    }
    case "DELETE": {
      return todos.filter((todo) => todo.id !== action.targetId);
    }
    default:
      return todos;
  }
}
function App() {
  // const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [todos, dispatch] = useReducer(reducer, mockTodos);
  const idRef = useRef(3);

  const onCreate = (content: string) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createDate: new Date().getTime(),
    };
    dispatch({ type: "CREATE", newItem });
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId: number) => {
    dispatch({ type: "UPDATE", targetId });
  }, []);

  const onDelete = useCallback((targetId: number) => {
    dispatch({ type: "DELETE", targetId });
  }, []);
  return (
    <div className="App">
      <Header />
      <TodoContext.Provider value={{ todos, onCreate, onUpdate, onDelete }}>
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
