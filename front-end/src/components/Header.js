import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { useGlobalContext } from "../context";

const Header = () => {
    const { openModal } = useGlobalContext();

    return (
        <div className="header">
            <h1>ToDo List</h1>
            <button className="btn add-todo-btn" onClick={() => openModal("add")}>
                <BsPlusLg />
            </button>
        </div>
    );
};

export default Header;
