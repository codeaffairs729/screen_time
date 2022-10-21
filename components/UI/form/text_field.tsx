import clsx from "clsx";
import React from "react";
import { useController } from "react-hook-form";
import { FieldProps } from "common/type";

type TextFieldProps = FieldProps & {
    type?: string;
    rows?: number;
    textfieldClassName?: string;
};

const TextField = ({
    placeholder = "",
    type = "text",
    className = "",
    textfieldClassName = "",
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
    const hasError = error && Object.keys(error).length > 0;

    return (
        <div className={clsx("relative w-full", className)}>
            {type == "textarea" ? (
                <textarea
                    placeholder={placeholder}
                    className={clsx(
                        "block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-lg focus:ring-dtech-secondary-light border-2 border-dtech-secondary-light focus:border-dtech-secondary-light placeholder:text-gray-400 placeholder:text-sm disabled:border-gray-300 disabled:bg-gray-50",
                        { "border-red-700": hasError },
                        textfieldClassName
                    )}
                    rows={rows}
                    {...register}
                    disabled={disabled}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className={clsx(
                        "block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-lg focus:ring-dtech-secondary-light border-2 border-dtech-secondary-light focus:border-dtech-secondary-light placeholder:text-gray-400 placeholder:text-sm disabled:border-gray-300 disabled:bg-gray-50",
                        { "border-red-700": hasError },
                        textfieldClassName
                    )}
                    {...register}
                    disabled={disabled}
                />
            )}
            {hasError && (
                <div className="text-xs text-red-800 ml-1 mt-1">
                    {error["message"]}
                </div>
            )}
        </div>
    );
};

export default TextField;
