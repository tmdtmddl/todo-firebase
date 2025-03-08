import React from "react";
import { twMerge } from "tailwind-merge";

type ContainerType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Col = (props: ContainerType) => {
  return (
    <div {...props} className={twMerge("flex flex-col", props?.className)} />
  );
};
export const Row = (props: ContainerType) => {
  return <div {...props} className={twMerge("flex", props?.className)} />;
};
