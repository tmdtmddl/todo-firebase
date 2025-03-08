import { useState, useRef, useCallback, useMemo } from "react";
import { Button, Form } from "./components";
import { v4 } from "uuid";

interface NameProps {
  id: string | null;
  name: string;
}

const CURDForm = ({ todos, setTodos }) => {
  const initialState: NameProps = useMemo(
    () => ({
      id: v4(),
      name: "",
      email: "",
      password: "",
    }),
    []
  );
  const [todo, setTodo] = useState(initialState);

  const ref = useRef<HTMLInputElement>(null);

  const todoMessage = useMemo(() => {
    const name = todo.name;
    if (name.length === 0) {
      return "이름을 입력해주세요";
    }
    return null;
  }, [todo.name]);

  const onSubmit = useCallback(() => {
    const focus = (target: keyof NameProps) => {
      setTimeout(() => {
        if (target === "name") {
          return ref.current?.focus();
        }
      }, 100);
    };
    if (todoMessage) {
      alert(todoMessage);
      return focus("name");
    }

    alert(`${todo.name}님 반가워요!`);
    setTodo(initialState);
  }, [todoMessage, todo.name, ref, initialState]);

  return (
    <Form.Container
      onSubmit={onSubmit}
      className="flex flex-col gap-y-2.5 border max-w-4xl mx-auto"
    >
      <Form.Label>이름을 입력하세요.</Form.Label>
      <Form.Input ref={ref} className="border border-amber-300 " />
      <Button.Opacity type="submit" className="bg-teal-600 text-white">
        선택
      </Button.Opacity>
    </Form.Container>
  );
};

export default CURDForm;
