import "./TodoList.css";
import TodoItem from "./TodoItem";
import { type Todo } from "../App";
import { useMemo, useState, type ChangeEvent } from "react";
import TodoContext from "../TodoContext";
import { useContext } from "react";

// interface TodoListProps {
//   todos: Todo[];
//   onUpdate: (targetId: number) => void;
//   onDelete: (targetId: number) => void;
// }

function TodoList() {
  const [search, setSearch] = useState("");
  const { todos, onUpdate, onDelete } = useContext(TodoContext);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    return search === ""
      ? todos
      : todos.filter((todo) =>
          todo.content.toLocaleLowerCase().includes(search.toLowerCase()),
        );
  };

  const analyzeTodo = useMemo(() => {
    //{totalCount, doneCount, notDoneCount}
    console.log("analyzeTodo 호출");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;
  return (
    <div className="TodoList">
      <h4>Todo List</h4>
      <div>
        <div>총 개수: {totalCount}</div>
        <div>완료된 할 일: {doneCount}</div>
        <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
      </div>
      <input
        type="text"
        className="searchbar"
        placeholder="검색어를 입력하세요"
        onChange={onChangeSearch}
      />
      <div>
        {getSearchResult().map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
