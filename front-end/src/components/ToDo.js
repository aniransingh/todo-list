import React, { useState } from "react";
import axios from "axios";
import { BsCheckCircleFill } from "react-icons/bs";
import {
    MdOutlineRadioButtonUnchecked,
    MdRemoveCircle,
    MdEdit,
} from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { useGlobalContext } from "../context";

const ToDo = ({ id, title, desc, completed }) => {
    const { getTodos, openModal } = useGlobalContext();
    const [showEditDelete, setShowEditDelete] = useState(false);

    const handleDelete = () => {
        axios.delete(`http://localhost:4000/api/v1/todos/${id}`).then((res) => {
            console.log(res.data);
            getTodos();
        });
    };

    const handleComplete = () => {
        axios
            .patch(`http://localhost:4000/api/v1/todos/${id}`, {
                completed: !completed,
            })
            .then((res) => {
                console.log(res.data);
                getTodos();
            });
    };

    return (
        <div
            className="todo"
            onMouseOver={() => setShowEditDelete(true)}
            onMouseLeave={() => setShowEditDelete(false)}
        >
            <div className="col col-1">
                <button
                    className={`btn completed-btn ${completed && "checked"}`}
                    onClick={handleComplete}
                >
                    {completed ? (
                        <BsCheckCircleFill />
                    ) : (
                        <MdOutlineRadioButtonUnchecked />
                    )}
                </button>
            </div>
            <div className="col col-2">
                <p className={`todo-title ${completed && "title-checked"}`}>
                    {title}
                </p>
                <p className={`todo-desc ${completed && "desc-checked"}`}>{desc}</p>
            </div>
            {showEditDelete && (
                <div className="col col-3">
                    {!completed && (
                        <button className="btn edit-btn" onClick={() => openModal("update", id)}>
                            <RiEditCircleFill />
                        </button>
                    )}
                    <button className="btn remove-btn" onClick={handleDelete}>
                        <MdRemoveCircle />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ToDo;
