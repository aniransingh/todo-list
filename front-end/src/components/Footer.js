import React from "react";
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";
import { useGlobalContext } from "../context";

const Footer = () => {
    const { getTodos, isListEmpty } = useGlobalContext();

    const emptyList = () => {
        axios.delete("http://localhost:4000/api/v1/todos").then((res) => {
            console.log(res.data);
            getTodos();
        });
    };

    return (
        <div className="footer">
            {!isListEmpty && (
                <button className="btn clear-list-btn" onClick={emptyList}>
                    <BsTrashFill />
                </button>
            )}
        </div>
    );
};

export default Footer;
