import { style, keyframes } from "@vanilla-extract/css";

const fromTop = keyframes({
  "0%": {
    transform: "translateY(50px)",
    opacity: 0,
  },
  "100%": {
    transform: "translateY(0)",
    opacity: 1,
  },
});
const styles: string = style({
  animation: `${fromTop} 1s ease`,
  display: "flex",
  flexDirection: "column",
});

export default styles;
