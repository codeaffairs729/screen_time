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
          // type="text"
          placeholder={placeholder}
          className="block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-lg border-2 border-dtech-secondary-light outline-dtech-secondary-dark"
          rows={rows}
          {...register}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-lg border-2 border-dtech-secondary-light outline-dtech-secondary-dark placeholder:text-gray-500 placeholder:text-sm placeholder:font-bold"
          {...register}
        />
      )}
      {/* <label className="absolute top-0 text-gray-700 p-3 duration-300 origin-0 pointer-events-none">
        {placeholder}
        {formControl.rules['required'] ? (
          <span className="text-xs text-red-600 relative -top-1">*</span>
        ) : (
          ''
        )}
      </label> */}
      {error && Object.keys(error).length > 0 && (
        <div className="text-xs font-light text-red-800 ml-1 mt-1">
          {error["message"]}
        </div>
      )}
    </div>
  );
};

export default TextField;
