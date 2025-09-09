// EXTERNAL MODULES
const express = require("express");

// LOCAL MODULES
const TodoItemController = require("../controllers/TodoItemController");

// DEFINING ROUTER
const TodoItemRouter = express.Router();

// DEFINING CRUD RESTAPI'S
// CREATE
TodoItemRouter.post("/", TodoItemController.createTodoItem);
// READ
TodoItemRouter.get("/", TodoItemController.getTodoItems);
// UPDATE
TodoItemRouter.put("/:id/completed", TodoItemController.markItemCompleted);
// DELETE
TodoItemRouter.delete("/:id", TodoItemController.deleteTodoItem);

module.exports = TodoItemRouter;
