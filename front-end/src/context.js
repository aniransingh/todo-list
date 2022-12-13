import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTodoId, setCurrentTodoId] = useState();
    const [modalType, setModalType] = useState("add");
    const [isListEmpty, setIsListEmpty] = useState(true);

    const getTodos = () => {
        axios.get("http://localhost:4000/api/v1/todos").then((res) => {
            setTodos(res.data);
            if (res.data.length > 0) setIsListEmpty(false);
            else setIsListEmpty(true);
        });
    };

    useEffect(() => {
        getTodos();
    }, []);

    const openModal = (type, id) => {
        setModalType(type);

        if (id) setCurrentTodoId(id);

        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <AppContext.Provider
            value={{
                todos,
                isModalOpen,
                isListEmpty,
                modalType,
                currentTodoId,
                getTodos,
                openModal,
                closeModal,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
