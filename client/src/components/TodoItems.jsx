import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";
const TodoItems = ({
  todoItems,
  deleteButtonHandler,
  markCompletedHandler,
}) => {
  // Separate incomplete and completed tasks
  const incomplete = todoItems.filter((item) => !item.completed);
  const completed = todoItems.filter((item) => item.completed);
  return (
    <div className={styles.itemsContainer}>
      {incomplete.map((item) => (
        <TodoItem
          todoItem={item}
          deleteButtonHandler={deleteButtonHandler}
          markCompletedHandler={markCompletedHandler}
          key={item.id}
        />
      ))}
      {completed.length > 0 && <hr />}
      {completed.map((item) => (
        <TodoItem
          todoItem={item}
          deleteButtonHandler={deleteButtonHandler}
          markCompletedHandler={markCompletedHandler}
          key={item.id}
        />
      ))}
    </div>
  );
};
export default TodoItems;
