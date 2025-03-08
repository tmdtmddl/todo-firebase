import { twMerge } from "tailwind-merge";
import styles from "./animation.css";

type EmergeType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export const Emerge = (props: EmergeType) => {
  return <div {...props} className={twMerge(styles, props?.className)} />;
};
