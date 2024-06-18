import React, { useState, useEffect } from "react";

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
        const updatedTodos = todos.filter(
            (_, index) => index !== indexToDelete
        );
        setTodos(updatedTodos);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            const newTodo = { text: inputValue, completed: false };
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    };

    const handleToggleCompleted = (indexToToggle) => {
        const updatedTodos = todos.map((todo, index) => {
            if (index === indexToToggle) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
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
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleCompleted(index)}
                            className="completed mr-2"
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
                {todos.length} elemento(s)
            </div>
            <footer className="footer mt-5">
                <div className="container text-center text-white">
                    Made by{" "}
                    <a
                        href="https://github.com/greyzeids"
                        target="_blank"
                        rel=""
                    >
                        Miquel Carnot
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default TodoList;
