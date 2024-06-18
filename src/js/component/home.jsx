import React from "react";
import TodoList from "./TodoList";
import AnimatedBackground from "./AnimateBackground";

export const Home = () => {
    return (
        <div className="FormBack">
            <TodoList />
            <AnimatedBackground />
        </div>
    );
};

export default Home;
