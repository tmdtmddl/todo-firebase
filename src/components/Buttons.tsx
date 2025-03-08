import React from "react";
import { twMerge } from "tailwind-merge";
import { Link as L } from "react-router-dom";

type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const sharedButtonStyle =
  "flex justify-center items-center h-10 rounded cursor-pointer bg-gray-50";

export const Opacity = (props: ButtonType) => (
  <button
    {...props}
    className={twMerge(
      sharedButtonStyle,
      "hover:opacity-80 active:opacity-50",
      props?.className
    )}
    type={props?.type ?? "button"}
  />
);

export const Pressable = (props: ButtonType) => (
  <button
    {...props}
    className={twMerge(sharedButtonStyle, props?.className)}
    type={props?.type ?? "button"}
  />
);

type LinkType = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
export const Link = (props: LinkType) => (
  <L
    {...props}
    to={props?.href as any}
    className={twMerge(sharedButtonStyle, props?.className)}
  />
);
