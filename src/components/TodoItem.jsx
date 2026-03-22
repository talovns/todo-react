import { useEffect, useRef, useState } from "react";

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    // если текст поменяли снаружи (после сохранения) — синхронизируем
    setEditText(task.text);
  }, [task.text]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const save = () => {
    const trimmed = editText.trim();
    if (trimmed.length === 0) {
      setEditText(task.text);   // пустое не сохраняем
      setIsEditing(false);
      return;
    }
    onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  const cancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px",
        borderBottom: "1px solid var(--border)", // вместо #eee
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          style={{
            flex: 1,
            padding: "6px 8px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--text)",
          }}
        />
      ) : (
        <span
          onDoubleClick={() => {
            setIsEditing(true);
          }
          }
          
          title="Двойной клик — редактировать"
          style={{
            flex: 1,
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "var(--muted)" : "var(--text)",
            cursor: "text",
            userSelect: "none",
          }}
        >
          {task.text}
        </span>
      )}

      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: "var(--danger)",  // вместо #ff4444
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;