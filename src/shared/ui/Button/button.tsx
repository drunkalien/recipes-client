import cn from "classnames";
import { HTMLProps } from "react";

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

type ButtonProps = NativeButtonProps & {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "danger" | "gray";
};

export const Button = ({
  children,
  className,
  color = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn("py-3 px-5 text-white rounded", className, {
        "bg-blue-500": color === "primary",
        "bg-red-500": color === "danger",
        "bg-gray-300 text-black": color === "gray",
      })}
    >
      {children}
    </button>
  );
};
