import clsx from "clsx";
import React from "react";
import { useController } from "react-hook-form";
import { FieldProps } from "common/type";

type TextFieldProps = FieldProps & {
    type?: string;
    rows?: number;
    textfieldClassName?: string;
    errorPosition?: boolean;
    optionsClass?: string;
};

const TextField = ({
    placeholder = "",
    type = "text",
    className = "",
    textfieldClassName = "",
    disabled = false,
    rows = 3,
    formControl,
    errorPosition = false,
    optionsClass = " ",
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
    const isPassword =
        error && error["message"]?.includes("Password should contain atleast,");
    const errorArray = [
        "Password should contain atleast",
        "8 charachters",
        "1 uppercase character",
        "1 number",
        "1 special character[!@#$%^&*]",
    ];

    return (
        <div className={clsx("relative w-full", className)}>
            {errorPosition && hasError && (
                <div className="text-xs text-red-800 ml-1 mt-1 mb-2">
                    {error["message"]}
                </div>
            )}
            <div></div>
            {type == "textarea" ? (
                <textarea
                    placeholder={placeholder}
                    className={clsx(
                        "block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-lg focus:ring-dtech-secondary-light border-2 border-dtech-main-dark focus:border-dtech-secondary-light placeholder:text-gray-400 placeholder:text-sm disabled:border-gray-300 disabled:bg-gray-50",
                        { "border-red-700": hasError },
                        textfieldClassName,
                        optionsClass
                    )}
                    rows={rows}
                    {...register}
                    disabled={disabled}
                    required={true}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className={clsx(
                        "block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-[30px] focus:ring-[#6DCDCB] border-2 border-[#333] focus:border-dtech-secondary-light placeholder:text-gray-400 placeholder:text-sm disabled:border-gray-300 disabled:bg-gray-50",
                        { "border-red-700": hasError },
                        textfieldClassName,
                        optionsClass
                    )}
                    required={true}
                    {...register}
                    disabled={disabled}
                    readOnly={register.name === "max_members"}
                />
            )}
            {!errorPosition && hasError && !isPassword && (
                <div className="text-xs text-red-800 ml-1 mt-1">
                    {error["message"]}
                </div>
            )}
            {!errorPosition && hasError && isPassword && (
                <div className="text-xs sm:bg-[#EBEBEB] bg-[white] rounded-[10px] text-black-800 ml-1 mt-1 p-1">
                    {errorArray.map((item, index) => {
                        if (
                            error["message"]
                                ?.slice(32)
                                ?.split(",")
                                .map((message) => message.trim())
                                .includes(item.trim()) ||
                            index == 0
                        )
                            return <div className=" m-1">{item}</div>;
                        else {
                            {
                                return (
                                    <div className=" m-1 text-dtech-dark-teal">
                                        {item}
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
            )}
        </div>
    );
};
export default TextField;
