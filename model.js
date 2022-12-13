const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "must provide title"],
        trim: true,
    },
    description: {
        type: String,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = { Todo };
