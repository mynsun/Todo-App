import React, { useRef, useState } from "react";
import "./TodoEditor.css";

interface TodoEditorProps {
  onCreate: (content: string) => void;
}

function TodoEditor({ onCreate }: TodoEditorProps) {
  const [content, setContent] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (!content) {
      inputRef.current?.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기 ✏️</h4>
      <div className="editor-wrapper">
        <input
          type="text"
          placeholder="새로운 Todo..."
          onChange={onChangeContent}
          ref={inputRef}
          onKeyUp={onKeyUp}
          value={content}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
}

export default TodoEditor;
