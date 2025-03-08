import { useCallback, useState } from "react";
import TodoForm from "./TodoForm";
import { AlertComponent, Button, Container } from "./components";
import { User } from "./@types";
import { twMerge } from "tailwind-merge";
import { Alert } from "./context";
import { FaUser } from "react-icons/fa";
import { dbService } from "./lib";

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

  //? ?삭제가 안됨?????
  const { alert } = Alert.use();
  const onDelete = useCallback(async () => {
    const ref = dbService.collection("sample").doc();
    if (confirm("삭제하시겠습니까?")) {
      setTodos((prev) => prev.filter((item) => item.name !== payload?.name));
      alert("삭제했습니다");
    } else {
      alert("취소했습니다");
    }
    try {
      await ref.delete();
      console.log("삭제되었습니다.");
    } catch (error: any) {
      console.log(error);
    }
  }, [payload, setTodos, alert]);

  return (
    <li className="border border-teal-800 rounded-xl bg-white ">
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
        <Container.Col className="flex flex-row justify-between p-5 lg:flex-col">
          <div>
            <div className="flex gap-x-1.5 items-center  ">
              <FaUser className="text-teal-700 " />
              <p className="font-bold">{index + 1}.</p>
              <p>{payload?.name}</p>
            </div>
            <p>{payload?.email}</p>
            <p>pw:{payload?.password}</p>
          </div>

          <Container.Col className="flex flex-col justify-between gap-y-4 ">
            <div className="flex justify-end lg:justify-start">
              <Button.Opacity
                onClick={toggleModal}
                className={twMerge(
                  bnts,
                  " rounded-3xl bg-teal-700 justify-end  items-center "
                )}
              >
                ID
              </Button.Opacity>
            </div>
            <Container.Row className="flex gap-2.5 items-end ">
              <Button.Opacity
                onClick={editHandler}
                className={twMerge(bnts, " bg-teal-600  ")}
              >
                수정
              </Button.Opacity>
              <Button.Opacity
                type="submit"
                onClick={onDelete}
                className={twMerge(bnts, " bg-red-500  ")}
              >
                삭제
              </Button.Opacity>
            </Container.Row>
          </Container.Col>
        </Container.Col>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs ">
          <div className="bg-green-50 p-5 rounded-lg shadow-lg w-80 flex flex-col border border-green-600">
            <div className="flex justify-end">
              <Button.Opacity
                onClick={toggleModal}
                className="bg-green-50 w-10  font-bold"
              >
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

const bnts = "p-2 h-8 text-white";
