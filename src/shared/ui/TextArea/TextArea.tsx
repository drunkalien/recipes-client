import { forwardRef, useId } from "react";
import cn from "classnames";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  placeholder?: string;
  errorMessage?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, placeholder = "", errorMessage = "", ...props }: TextAreaProps,
    ref
  ) => {
    const error = !!errorMessage;
    const textAreaId = useId();

    return (
      <div className="flex flex-col mb-2">
        <label
          htmlFor={textAreaId}
          className={cn({ "text-red-500": error }, "mb-2")}
          placeholder={placeholder}
        >
          {label}
        </label>
        <textarea
          ref={ref as any}
          className={cn(
            { "border-red-500": error },
            "border border-black p-2 rounded"
          )}
          {...props}
          id={textAreaId}
        />
        {error && <div className="text-red-500">{errorMessage}</div>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
