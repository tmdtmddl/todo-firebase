import React from "react";
import { twMerge } from "tailwind-merge";

type HeadingType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;
export const H1 = (props: HeadingType) => {
  return (
    <h1
      {...props}
      className={twMerge("text-2xl font-black", props?.className)}
    />
  );
};

type TextType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;
export const Text = (props: TextType) => {
  return <p {...props} className={twMerge("font-light", props?.className)} />;
};
