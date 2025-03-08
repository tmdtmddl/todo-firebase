import React from "react";
import { twMerge } from "tailwind-merge";

type FormType = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Container = (props: FormType) => {
  return (
    <form
      {...props}
      className={twMerge("flex flex-col gap-y-2.5", props?.className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (props.onSubmit) {
          props.onSubmit(e);
        }
      }}
    />
  );
};

type LabelType = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
export const Label = (props: LabelType) => (
  <label
    {...props}
    className={twMerge("text-gray-500 text-xs", props?.className)}
  />
);

type InputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const sharedInputStyle =
  "h-10 rounded bg-gray-50 outline-none focus:border focus:border-blue-500";

export const Input = (props: InputType) => (
  <input
    {...props}
    className={twMerge(sharedInputStyle, "px-2.5", props?.className)}
  />
);

type SelectType = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
export const Select = (props: SelectType) => (
  <select {...props} className={twMerge(sharedInputStyle, props?.className)} />
);
