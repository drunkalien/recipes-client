import { forwardRef, useId } from "react";
import cn from "classnames";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, placeholder = "", errorMessage = "", ...props }: InputProps,
    ref
  ) => {
    const error = !!errorMessage;
    const inputId = useId();

    return (
      <div className="flex flex-col mb-2">
        <label
          htmlFor={inputId}
          className={cn({ "text-red-500": error }, "mb-2")}
          placeholder={placeholder}
        >
          {label}
        </label>
        <input
          ref={ref as any}
          className={cn(
            { "border-red-500": error },
            "border border-black p-2 rounded"
          )}
          {...props}
          id={inputId}
        />
        {error && <div className="text-red-500">{errorMessage}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
