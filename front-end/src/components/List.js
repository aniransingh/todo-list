import React, { useEffect, useState } from "react";
import ToDo from "./ToDo";
import { useGlobalContext } from "../context";

const List = () => {
    const { todos, isListEmpty } = useGlobalContext();

    if (isListEmpty) {
        return (
            <div className="list empty">
                <p>List is empty 🐶</p>
            </div>
        );
    }

    return (
        <div className="list">
            {todos?.map((todo) => {
                const { _id, title, description, completed } = todo;
                return (
                    <ToDo
                        key={_id}
                        id={_id}
                        title={title}
                        desc={description}
                        completed={completed}
                    />
                );
            })}
        </div>
    );
};

export default List;
