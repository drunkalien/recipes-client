import { forwardRef, useId } from "react";

import { OptionType } from "@/shared/types/optionType";

type SelectProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  options: OptionType[];
  errorMessage?: string;
};

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ label, options, errorMessage }: SelectProps, ref) => {
    const error = !!errorMessage;
    const selectId = useId();

    return (
      <div className="flex flex-col mb-2">
        <label className="mb-2" htmlFor={selectId}>
          {label}
        </label>
        <select
          ref={ref as any}
          className="p-2 border border-black rounded"
          name={label.toLowerCase()}
          id={selectId}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className="text-red-500">{errorMessage}</div>}
      </div>
    );
  }
);

Select.displayName = "Select";
