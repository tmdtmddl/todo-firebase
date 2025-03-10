import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { AlertComponent, Button, Container, Form } from "./components";
import { v4 } from "uuid";
import { User } from "./@types";
import { twMerge } from "tailwind-merge";
import { Alert } from "./context";
import { dbService } from "./lib";
import { addDoc, collection, doc } from "firebase/firestore";

interface Props {
  payload?: User;
  isEditing?: boolean;
  todos: User[];
  setTodos: any;
  onCancel?: () => void;
}

const TodoForm = ({ payload, isEditing, todos, setTodos, onCancel }: Props) => {
  const initialState: User = useMemo(
    () => ({
      Uid: "",
      name: "",
      email: "",
      password: "",
    }),
    []
  );
  const [todo, setTodo] = useState(payload ?? initialState);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const nameMessage = useMemo(() => {
    if (todo.name.length === 0) {
      return "이름을 입력해주세요.";
    }
  }, [todo.name]);

  const emailMessage = useMemo(() => {
    if (todo.email.length === 0) {
      return "이메일을 입력해주세요.";
    }

    if (!todo.email.includes("@")) {
      return "@을 포함해주세요.";
    }
    const split1 = todo.email.split("@");
    if (split1[1].length === 0) {
      return "@뒤에를 작성해주세요.";
    }
    if (!split1[1].includes(".")) {
      return ".을 포함해주세요.";
    }
    const split2 = split1[1].split(".");
    if (split2[split2.length - 1].length === 0) {
      return "'.'뒤에를 작성해주세요.";
    }
  }, [todo.email]);

  const pwMessage = useMemo(() => {
    if (todo.password.length === 0) {
      return "비밀번호를 입력해주세요.";
    }
    if (todo.password.length > 10) {
      return "비밀번호가 너무길어요.";
    }
  }, [todo.password]);

  const focus = useCallback(async () => {
    setTimeout(() => {
      if (nameMessage) {
        return nameRef.current?.focus();
      }
      if (emailMessage) {
        return emailRef.current?.focus();
      }
      if (pwMessage) {
        return pwRef.current?.focus();
      }
      return null;
    }, 100);
  }, [nameMessage, emailMessage, pwMessage, nameRef, emailRef, pwRef]);

  const { alert } = Alert.use();
  const onSubmit = useCallback(async () => {
    setTimeout(() => {
      if (nameMessage) {
        alert(nameMessage);
        return focus();
      }
      if (emailMessage) {
        alert(emailMessage);
        return focus();
      }
      if (pwMessage) {
        alert(pwMessage);
        return focus();
      }
    }, 100);

    const foundTodo = todos.find((item) => item.email === todo.email);
    if (!isEditing && foundTodo) {
      alert("중복된 이메일 입니다.");
      return;
    }

    setTodos((prev) => {
      let copy = [...prev];
      if (isEditing) {
        const index = todos.findIndex((t) => t === payload);
        if (index >= 0) {
          copy[index] = todo;
        }
      }
      // else {
      //   copy.unshift(todo);
      // }

      return copy;
    });

    try {
      const docRef = await addDoc(collection(dbService, "todos"), {
        ...todo,
      });
      console.log("저장 ID:", docRef.id);

      alert(isEditing ? "수정되었습니다." : "추가되었습니다.");
      setTodo(initialState);
      if (isEditing && onCancel) {
        onCancel();
      }
    } catch (error: any) {
      console.log("오류:", error);
    }

    // try {
    //   const ref = await addDoc(collection(dbService, "todos"), {
    //     id: todo.id,
    //     name: todo.name,
    //     email: todo.email,
    //     password: todo.password,
    //   });
    //   console.log(" ID:", ref.id);
    //   setTodos((prev) => [todo, ...prev]);
    //   alert(isEditing ? "수정되었습니다." : "추가되었습니다.");
    //   setTodo(initialState);
    // } catch (error: any) {
    //   return alert(error.message);
    // }
    // return;
  }, [
    todo,
    todos,
    initialState,
    isEditing,
    payload,
    setTodos,
    emailMessage,
    nameMessage,
    pwMessage,
    focus,
    alert,
    onCancel,
  ]);

  // const onAdd = useCallback(async () => {
  //   try {
  //     const ref = dbService.collection("todos");
  //     await ref.add({
  //       name: todo.name,
  //       email: todo.email,
  //       password: todo.password,
  //       Uid: todo.Uid,
  //     });
  //     console.log();
  //   } catch (error: any) {
  //     return alert(error);
  //   }
  // }, [alert, todo.Uid, todo.email, todo.name, todo.password]);

  return (
    <>
      <AlertComponent />
      <Form.Container
        onSubmit={onSubmit}
        className="flex flex-col gap-2.5 p-2.5  "
      >
        <Container.Col className="flex flex-col gap-2">
          <Container.Row className={twMerge(flexR)}>
            <Form.Label htmlFor="names">Name</Form.Label>
            <Form.Input
              id="names"
              ref={nameRef}
              name="name"
              value={todo.name}
              onChange={onChange}
              className="border border-green-900 "
              placeholder="이름을 입력하세요."
            />
          </Container.Row>

          <Container.Row className={twMerge(flexR)}>
            <Form.Label htmlFor="emails">Email</Form.Label>
            <Form.Input
              ref={emailRef}
              id="emails"
              name="email"
              type="text"
              value={todo.email}
              onChange={onChange}
              className="border border-green-900 "
              placeholder="ex)test@test.com"
            />
          </Container.Row>
          <Container.Row className={twMerge(flexR)}>
            <Form.Label htmlFor="pw">Password</Form.Label>
            <Form.Input
              ref={pwRef}
              id="pw"
              name="password"
              type="password"
              value={todo.password}
              onChange={onChange}
              className="border border-green-900 "
              placeholder="비밀번호를 입력하세요.(11자리이하)"
            />
          </Container.Row>
        </Container.Col>

        <Container.Col className="flex flex-row gap-x-2 justify-end ">
          <Button.Opacity
            type="submit"
            className={!isEditing ? isEdit : "bg-teal-600 text-white p-5 "}
          >
            {isEditing ? "수정" : "추가"}
          </Button.Opacity>
          {isEditing && (
            <Button.Opacity
              type="button"
              onClick={onCancel}
              className="bg-gray-300 p-5 "
            >
              취소
            </Button.Opacity>
          )}
        </Container.Col>
      </Form.Container>
    </>
  );
};

export default TodoForm;

const flexR = "flex flex-col";

const isEdit = "flex-1 bg-teal-600 text-white p-5";
