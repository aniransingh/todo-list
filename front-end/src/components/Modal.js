import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { IoMdCloseCircle } from "react-icons/io";

const Modal = () => {
    const {
        isModalOpen,
        closeModal,
        getTodos,
        modalType,
        currentTodoId: id,
    } = useGlobalContext();
    const modalRef = useRef();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);

    const handleModal = () => {
        if (isModalOpen && !modalRef?.current.open) {
            if (modalType === "add") {
                setFormData({});
                modalRef.current.showModal();
            }

            if (modalType === "update") {
                axios
                    .get(`http://localhost:4000/api/v1/todos/${id}`)
                    .then((res) => {
                        const title = res.data.title;
                        const desc = res.data.description;
                        setFormData({ title, desc });
                        modalRef.current.showModal();
                    });
            }
        }

        if (!isModalOpen && modalRef?.current.open) {
            setError(false);
            modalRef.current.close();
        }
    };

    useEffect(() => {
        handleModal();
    }, [isModalOpen]);

    const handleChange = (e) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { title, desc } = formData;

        if (!title) return setError(true);

        if (modalType === "add") {
            axios
                .post("http://localhost:4000/api/v1/todos", {
                    title: title.trim(),
                    description: desc?.trim(),
                })
                .then((res) => {
                    console.log(res.data);
                    getTodos();
                });
        }

        if (modalType === "update") {
            axios
                .patch(`http://localhost:4000/api/v1/todos/${id}`, {
                    title: title.trim(),
                    description: desc?.trim(),
                })
                .then((res) => {
                    console.log(res.data);
                    getTodos();
                });
        }

        closeModal();
    };

    return (
        <dialog ref={modalRef} className="modal">
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="row row-1">
                    <h2>{modalType === "add" ? "New Todo" : "Update Todo"}</h2>
                    <button
                        type="button"
                        className="btn close-btn"
                        onClick={closeModal}
                    >
                        <IoMdCloseCircle />
                    </button>
                </div>
                <div className="row row-2">
                    {error && (
                        <p className="error-message">Title cannot be empty</p>
                    )}
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                    />
                    <textarea
                        rows="8"
                        name="desc"
                        placeholder="Description"
                        value={formData.desc || ""}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="row row-3">
                    <button type="submit" className="btn submit-btn">
                        Done
                    </button>
                </div>
            </form>
        </dialog>
    );
};

export default Modal;
