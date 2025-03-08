import { useCallback } from "react";
import { Alert } from "../context";
import { Animated, Button, Container } from "./";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

const AlertComponent = () => {
  const { closeFn, state, buttons, message, title } = Alert.use();

  const AlertButton = useCallback(
    ({ onClick, text, index }: Alert.Button & { index: number }) => {
      const blue = index !== 0 || buttons?.length === 1;
      return (
        <Button.Opacity
          className={twMerge("px-5", blue && "text-white bg-blue-400")}
          onClick={() => {
            closeFn();
            if (onClick) {
              onClick();
            }
          }}
        >
          {text ?? "확인"}
        </Button.Opacity>
      );
    },
    [closeFn, buttons]
  );

  return (
    state && (
      <Container.Row className="fixed top-0 left-0 z-10 w-full h-screen justify-center items-center">
        <Animated.Emerge className="border p-2.5 border-gray-200 rounded-xl relative z-1 min-w-50 max-w-75 overflow-hidden bg-white">
          <Button.Opacity
            className="absolute top-0 right-0 h-8 w-8 bg-white"
            onClick={closeFn}
          >
            <AiOutlineClose />
          </Button.Opacity>
          <Container.Col>
            <Container.Row className="gap-x-2.5">
              <img
                src="https://cdn.pixabay.com/photo/2019/09/16/20/21/cat-cat-4481997_1280.jpg"
                alt="alert message"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 bg-gray-100 object-cover border border-gray-200"
              />
              <Container.Col className="gap-y-1">
                <p className="leading-none font-bold">{title ?? "알림"}</p>
                <p className="text-gray-500 text-sm">
                  {message ??
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis corporis necessitatibus accusamus fugiat. Aliquid praesentium blanditiis eos quos dolores ratione? Fuga cumque ipsa eos ut nam placeat enim maiores."}
                </p>
                <Container.Row className="mt-2.5 gap-x-2.5">
                  {!buttons || buttons.length === 0 ? (
                    <AlertButton index={1} />
                  ) : (
                    buttons.map((button, index) => (
                      <AlertButton key={index} {...button} index={index} />
                    ))
                  )}
                </Container.Row>
              </Container.Col>
            </Container.Row>
          </Container.Col>
        </Animated.Emerge>
        <span
          onClick={closeFn}
          className="absolute w-full h-full top-0 left-0"
        />
      </Container.Row>
    )
  );
};

export default AlertComponent;
