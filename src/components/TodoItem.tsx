import "./TodoItem.css";
import { type Todo } from "../App.tsx";
import React from "react";
import { TodoDispatchContextType } from "../TodoContext.ts";
import { useContext } from "react";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  console.log(`${todo.id} TodoItem 업데이트`);
  const { onUpdate, onDelete } = useContext(TodoDispatchContextType);
  const onChangeCheckbox = () => {
    onUpdate(todo.id);
  };

  const onClickDelete = () => {
    onDelete(todo.id);
  };
  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={onChangeCheckbox}
        />
      </div>
      <div className="title_col">{todo.content}</div>
      <div className="date_col">
        {new Date(todo.createDate).toLocaleDateString()}
      </div>
      <div className="btn_col">
        <button onClick={onClickDelete}>삭제</button>
      </div>
    </div>
  );
}

export default React.memo(TodoItem);
