import React, { useState, useEffect } from "react";

export const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-success">Lista de la compra</h1>
            <ul className="row p-0">
                <li className="border-0 p-0">
                    <input
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && inputValue.trim() !== "") {
                                setTodos(todos.concat(inputValue));
                                setInputValue("");
                            }
                        }}
                        name="text"
                        placeholder="Me falta..."
                        className="input"
                        type="text"
                    />
                </li>
                {todos.map((item, index) => (
                    <li key={index}>
                        {item}{" "}
                        <i
                            className="icono mt-1 fa fa-solid fa-delete-left"
                            onClick={() =>
                                setTodos(
                                    todos.filter(
                                        (_, currentIndex) =>
                                            index !== currentIndex
                                    )
                                )
                            }
                        ></i>
                    </li>
                ))}
            </ul>
            <div className="p-0 text-white">{todos.length} elemento(s)</div>
        </div>
    );
};

export default TodoList;
