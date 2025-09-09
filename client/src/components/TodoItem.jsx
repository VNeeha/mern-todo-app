import styles from "./TodoItem.module.css";
import { MdDelete } from "react-icons/md";
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TodoItem({ todoItem, deleteButtonHandler, markCompletedHandler }) {
  return (
    <div className={`container ${todoItem.completed ? styles.completed : ""}`}>
      <div
        className={`row ${styles.itemRow}`}
        style={
          todoItem.completed
            ? { opacity: 0.6, textDecoration: "line-through" }
            : {}
        }
      >
        <div className="col-1">
          <input
            type="checkbox"
            checked={todoItem.completed}
            onChange={() => markCompletedHandler(todoItem.id)}
            aria-label="Mark as completed"
          />
        </div>
        <div className="col-5">{todoItem.todoTask}</div>
        <div className="col-4">{formatDate(todoItem.todoDueDate)}</div>
        <div className="col-2">
          <button
            className="btn btn-success btn-custom"
            onClick={() => deleteButtonHandler(todoItem.id)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
      {todoItem.completed && (
        <div className="row">
          <div className="col-12 text-success" style={{ fontSize: "0.9em" }}>
            Completed
          </div>
        </div>
      )}
    </div>
  );
}
export default TodoItem;
