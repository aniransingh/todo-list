const express = require("express");
const router = express.Router();

const {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
} = require("./controllers");

router.route("/").get(getAllTodos).post(createTodo).delete(deleteAllTodos);
router.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

module.exports = { router };
