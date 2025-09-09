import TodoHeading from "./components/TodoHeading";
import TodoInput from "./components/TodoInput";
import TodoItems from "./components/TodoItems";
import NoTasksMessage from "./components/NoTasksMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemsFromServer,
  markCompletedInServer,
} from "./services/TodoItemService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getInitialItems = async () => {
      const initialItems = await getItemsFromServer();
      setTodoItems(initialItems);
    };
    getInitialItems();
    return () => {
      controller.abort();
    };
  });

  const addButtonHandler = async (todoTask, todoDueDate) => {
    const savedItem = await addItemToServer(todoTask, todoDueDate);
    setTodoItems((currentVal) => {
      let newItems = [...currentVal, savedItem];
      return newItems;
    });
  };
  const deleteButtonHandler = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    let newItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newItems);
  };
  const markCompletedHandler = async (id) => {
    const updatedItem = await markCompletedInServer(id);
    let newItems = todoItems.map((item) => {
      if (item.id === id) {
        return updatedItem;
      }
      return item;
    });
    setTodoItems(newItems);
  };

  return (
    <>
      <TodoHeading />
      <TodoInput addButtonHandler={addButtonHandler} />
      {todoItems.length == 0 && <NoTasksMessage />}
      <TodoItems
        todoItems={todoItems}
        deleteButtonHandler={deleteButtonHandler}
        markCompletedHandler={markCompletedHandler}
      />
    </>
  );
}

export default App;
