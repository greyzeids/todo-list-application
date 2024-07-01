import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

const TodoList = () => {
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

    const handleDelete = (indexToDelete) => {
        setTodos((prevTodos) =>
            prevTodos.filter((_, index) => index !== indexToDelete)
        );
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            const newTodo = { text: inputValue, completed: false };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setInputValue("");
        }
    };

    const handleToggleCompleted = (indexToToggle) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo, index) => {
                if (index === indexToToggle) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
        setTodos(updatedTodos);
    };

    const countPendingTodos = () => {
        return todos.filter((todo) => !todo.completed).length;
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Lista de Tareas</h1>
            <div className="col-12">
                <input
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && inputValue.trim() !== "") {
                            handleAddTodo();
                        }
                    }}
                    name="text"
                    placeholder="¿Cuál es la tarea hoy?"
                    className="input"
                    type="text"
                />
                <button
                    type="submit"
                    className="todo-btn"
                    onClick={handleAddTodo}
                >
                    Agregar Tarea
                </button>
            </div>
            <ul className="col-12 p-0 mt-3">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className={`Todo text-white ${
                            todo.completed ? "completed" : ""
                        }`}
                    >
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => handleToggleCompleted(index)}
                        />
                        {todo.text}
                        <i
                            className="ml-2 fa fa-trash"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(index)}
                        ></i>
                    </li>
                ))}
            </ul>
            <div className="col-12 p-0 text-white text-center">
                {countPendingTodos()} elemento(s) pendiente(s)
            </div>
        </div>
    );
};

export default TodoList;
