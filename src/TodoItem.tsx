import { useCallback, useState } from "react";
import TodoForm from "./TodoForm";
import { AlertComponent, Button, Container } from "./components";
import { User } from "./@types";
import { twMerge } from "tailwind-merge";
import { Alert } from "./context";

interface Props {
  todos: User[];
  setTodos: any;
  payload?: User;
  index: number;
}

const TodoItem = ({ todos, setTodos, payload, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const editHandler = () => setIsEditing((prev) => !prev);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);

  const { alert } = Alert.use();
  const onDelete = useCallback(() => {
    if (confirm("삭제하시겠습니까?")) {
      setTodos((prev) => prev.filter((item) => item !== payload));
      alert("삭제했습니다");
    } else {
      alert("취소했습니다");
    }
  }, [payload, setTodos, alert]);

  return (
    <li className="border border-teal-800 rounded-xl bg-white">
      <AlertComponent />
      {isEditing ? (
        <TodoForm
          isEditing={isEditing}
          onCancel={editHandler}
          payload={payload}
          setTodos={setTodos}
          todos={todos}
        />
      ) : (
        <Container.Col className="flex flex-row justify-between p-5">
          <div>
            <p>
              {index + 1}.{payload?.name}
            </p>

            <p>{payload?.email}</p>
            <p>{payload?.password}</p>
          </div>

          <Container.Col className="flex flex-col justify-between gap-y-4 ">
            <div className="flex justify-end ">
              <Button.Opacity
                onClick={toggleModal}
                className={twMerge(
                  bnts,
                  " rounded-3xl bg-teal-700 justify-end text-white items-center"
                )}
              >
                ID확인
              </Button.Opacity>
            </div>
            <Container.Row className="flex gap-2.5 items-end ">
              <Button.Opacity
                onClick={editHandler}
                className={twMerge(bnts, " bg-green-100 ")}
              >
                수정
              </Button.Opacity>
              <Button.Opacity
                type="submit"
                onClick={onDelete}
                className={twMerge(bnts, " bg-red-400 text-white ")}
              >
                삭제
              </Button.Opacity>
            </Container.Row>
          </Container.Col>
        </Container.Col>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs ">
          <div className="bg-white p-5 rounded-lg shadow-lg w-80 flex flex-col border border-teal-900">
            <div className="flex justify-end">
              <Button.Opacity onClick={toggleModal} className="bg-white w-10 ">
                X
              </Button.Opacity>
            </div>
            <h2 className="text-lg font-semibold">ID </h2>
            <p className="mt-2">{payload?.id}</p>
            <div className="flex justify-end mt-4"></div>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;

const bnts = "p-2 h-8";
