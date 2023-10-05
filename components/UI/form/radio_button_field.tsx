import { FieldProps } from 'common/type';
import { useEffect, useState } from 'react'
import { useController } from 'react-hook-form';
export type Option = {
    value: any;
    label: string;
};

const RadioButtonField = ({
    options,
    className = "",
    formControl,
    errorPosition = false,
}: {
    options: Option[];
    className?: string;
    errorPosition?: boolean;
} & FieldProps) => {
    const {
        fieldState: { error },
        field: { onChange, name, value },
    } = useController({
        ...formControl,
        defaultValue:
            formControl["defaultValue"] == undefined
                ? ""
                : formControl["defaultValue"],
    });

    useEffect(() => {
        const newValue = value || formControl["defaultValue"];
        if (![undefined, null].includes(newValue)) {
            const option = options.find((o) => o.value == newValue);
            if (option) {
                onChange(option?.value);
            }
        } else {
            onChange(null);
        }
    }, [value, formControl["defaultValue"]]);

    const hasError = error && Object.keys(error).length > 0;

    return (
        <div className="w-full">
            {
                options.map((option, i) => (
                    <RadioButton
                        key={i}
                        option={option}
                        name={name}
                        onDataChange={(o: any) => {
                            onChange(o?.target.value);
                        }}
                    />
                ))
            }

            {!errorPosition&& hasError && (
                <div className="text-xs text-red-800 ml-1 mt-1">
                    {error["message"]}
                </div>
            )}
        </div>
    )
}

const RadioButton = ({ option, name, onDataChange }: { option: Option, name: string, onDataChange?: any }) => {
    return (
        <div className="flex items-center mb-2">
            <input onClick={(e) => onDataChange(e)} id={`${name}_${option.value}`} type="radio" value={option.value} name={name}
                className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-[#6E498E] bg-[#FFFFFF] border-2 border-[#333333] focus:ring-[#6E498E] dark:focus:ring-[#6E498E] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor={`${name}_${option.value}`} className="ml-2 sm:text-[19px] font-normal text-gray-900 dark:text-gray-300">{option.label}</label>
        </div>
    );
};

export default RadioButtonField;
