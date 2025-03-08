import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todos, setTodo] = useState([]);
  return (
    <div>
      <TodoForm todos={todos} setTodos={setTodo} />
      <ul>
        {todos.map((todo, index) => {
          return <TodoItem key={todo.id} />;
        })}
      </ul>
    </div>
  );
};

export default Todo;
