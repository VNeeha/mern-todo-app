const TodoItem = require("../models/TodoItem");

exports.createTodoItem = async (req, res, next) => {
  const todoItem = new TodoItem(req.body);
  const savedTodoItem = await todoItem.save();
  res.status(201).json(savedTodoItem);
};
exports.getTodoItems = async (req, res, next) => {
  const TodoItems = await TodoItem.find();
  res.status(200).json(TodoItems);
};
exports.markItemCompleted = async (req, res, next) => {
  const id = req.params.id;
  const itemToMark = await TodoItem.findById(id);
  itemToMark.completed = true;
  const updatedItem = await itemToMark.save();
  res.status(200).json(updatedItem);
};
exports.deleteTodoItem = async (req, res, next) => {
  const id = req.params.id;
  await TodoItem.findByIdAndDelete(id);
  res.status(200).json({ id });
};
