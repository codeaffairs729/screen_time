import clsx from "clsx";
import React from "react";
import { useController } from "react-hook-form";
import { FieldProps } from "common/type";

type TextFieldProps = FieldProps & {
  type?: string;
  rows?: number;
};

const TextField = ({
  placeholder,
  type = "text",
  className = "",
  disabled = false,
  rows = 3,
  formControl,
}: TextFieldProps) => {
  const {
    fieldState: { error },
    field: register,
  } = useController({
    ...formControl,
    defaultValue:
      formControl["defaultValue"] == undefined
        ? ""
        : formControl["defaultValue"],
  });

  return (
    <div className={clsx("relative w-full", className)}>
      {type == "textarea" ? (
        <textarea
          placeholder={placeholder}
          className="block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-lg border-2 border-dtech-secondary-light outline-dtech-secondary-dark disabled:border-gray-300 disabled:bg-gray-50"
          rows={rows}
          {...register}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-lg border-2 border-dtech-secondary-light outline-dtech-secondary-dark placeholder:text-gray-500 placeholder:text-sm placeholder:font-bold disabled:border-gray-300 disabled:bg-gray-50"
          {...register}
          disabled={disabled}
        />
      )}
      {error && Object.keys(error).length > 0 && (
        <div className="text-xs font-light text-red-800 ml-1 mt-1">
          {error["message"]}
        </div>
      )}
    </div>
  );
};

export default TextField;
