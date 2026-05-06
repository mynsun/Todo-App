import "./TodoItem.css";
import { type Todo } from "../App.tsx";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (targetId: number) => void;
  onDelete: (targetId: number) => void;
}

function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
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

export default TodoItem;
