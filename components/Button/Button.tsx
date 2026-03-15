import css from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = {
  variant?: "primary" | "outline";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={clsx(css.btn, css[variant], className)} {...rest}>
      {children}
    </button>
  );
}
