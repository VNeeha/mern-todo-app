const API_URL = import.meta.env.VITE_API_URL;

export const addItemToServer = async (todoTask, todoDueDate) => {
  const todoItem = mapItemToServer(todoTask, todoDueDate);
  

  const savedItemJSON = await fetch(`${API_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoItem),
  });
  const savedItemJS = await savedItemJSON.json();
  return mapItemFromServer(savedItemJS);
};

export const getItemsFromServer = async () => {
  const todoItemsJSON = await fetch(`${API_URL}/api/todos`);
  const todoItems = await todoItemsJSON.json();
  return todoItems.map(mapItemFromServer);
};

export const deleteItemFromServer = async (id) => {
  const deletedIdJSON = await fetch(`${API_URL}/api/todos/${id}`, {
    method: "DELETE",
  });
  const deletedId = await deletedIdJSON.json();
  return deletedId;
};

export const markCompletedInServer = async (id) => {
  const updatedItemJSON = await fetch(
    `${API_URL}/api/todos/${id}/completed`,
    {
      method: "PUT",
    }
  );
  const updatedItem = await updatedItemJSON.json();
  return mapItemFromServer(updatedItem);
};

const mapItemToServer = (todoTask, todoDueDate) => {
  return {
    task: todoTask,
    date: todoDueDate,
  };
};
const mapItemFromServer = (savedItem) => {
  return {
    id: savedItem._id,
    todoTask: savedItem.task,
    todoDueDate: savedItem.date,
    completed: savedItem.completed,
  };
};
