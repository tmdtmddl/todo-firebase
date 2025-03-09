import { useState, useEffect } from "react";
import { PiUserListLight } from "react-icons/pi";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { User } from "./@types";
import { AlertComponent, Container, Typo } from "./components";
import { dbService } from "./lib";

const Todo = () => {
  const [todos, setTodos] = useState<User[]>([]);

  return (
    <>
      <AlertComponent />
      <Container.Col className="flex flex-col gap-y-2.5  max-w-2xl mx-auto border-2 p-8 border-gray-300 bg-gray-50">
        <Typo.H1 className="flex justify-center text-5xl gap-x-3">
          <p> 유저명단</p> <PiUserListLight className="text-green-900" />
        </Typo.H1>
        <TodoForm todos={todos} setTodos={setTodos} />
        <ul className="grid  gap-y-2  md:grid-cols-2 md:gap-2  lg:grid-cols-3 lg:gap-2">
          {todos.map((todo, index) => {
            return (
              <TodoItem
                key={todo.Uid}
                index={index}
                payload={todo}
                setTodos={setTodos}
                todos={todos}
              />
            );
          })}
        </ul>
      </Container.Col>
    </>
  );
};

export default Todo;
