import React from "react";
import Modal from "./components/Modal";
import ToDoList from "./components/ToDoList";

const App = () => {

    return (
        <div className="app">
            <ToDoList />
            <Modal />
        </div>
    );
};

export default App;
