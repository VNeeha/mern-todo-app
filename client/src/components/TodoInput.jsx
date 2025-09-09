import styles from "./TodoInput.module.css";
import { MdAddTask } from "react-icons/md";
import { useRef } from "react";
function TodoInput({ addButtonHandler }) {
  const todoTaskElement = useRef();
  const todoDueDateElement = useRef();
  const onAddButton = (event) => {
    event.preventDefault();
    const todoTask = todoTaskElement.current.value;
    const todoDueDate = todoDueDateElement.current.value;
    todoTaskElement.current.value = "";
    todoDueDateElement.current.value = "";
    addButtonHandler(todoTask, todoDueDate);
  };

  return (
    <div className="container">
      <form className="row" onSubmit={onAddButton}>
        <div className="col-6">
          <input className={styles.inputField} 
            type="text"
            placeholder="Enter task todo:"
            ref={todoTaskElement}
          />
        </div>
        <div className="col-4">
          <input className={styles.inputField}  type="date" ref={todoDueDateElement} />
        </div>
        <div className="col-2">
          <button type="submit" className="btn btn-danger btn-custom">
            <MdAddTask />
          </button>
        </div>
      </form>
    </div>
  );
}
export default TodoInput;
