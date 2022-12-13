const { Todo } = require("./model");

const getAllTodos = async (req, res) => {
    const todos = await Todo.find();

    res.status(200).json(todos);
};

const createTodo = async (req, res) => {
    await Todo.create(req.body);

    res.status(201).json({ status: "todo created" });
};

const getTodo = async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    res.status(200).json(todo);
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndUpdate(id, req.body);

    res.status(200).json({ status: "todo updated" });
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);

    res.status(200).json({ status: "todo deleted" });
};

const deleteAllTodos = async (req, res) => {
    await Todo.deleteMany({});

    res.status(200).json({ status: "all todos deleted" });
};

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo, deleteAllTodos };
