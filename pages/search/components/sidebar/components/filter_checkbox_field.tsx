import clsx from "clsx";
import { useRef, useState, forwardRef, RefObject } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const FilterCheckboxField = ({
    label,
    register,
    value,
    className = "",
    defaultChecked,
    count,
    dataSelector,
}: {
    label?: string;
    value?: any;
    register?: UseFormRegisterReturn;
    className?: string;
    defaultChecked: boolean;
    count: string;
    dataSelector?: string;
}) => {
    const ref = useRef<any>(null);

    // const handleClick = () =>{
    //     if(ref.current){
    //         (ref.current as HTMLButtonElement).click()
    //     }
    // }
    return (
        <div
            data-selector={dataSelector}
            className={clsx(
                "flex items-start py-2 cursor-pointer ",
                className,
                {
                    "hover:bg-[#EBEBEB]": !defaultChecked,
                    "bg-[#EBEBEB]": defaultChecked,
                }
            )}
        >
            <input
                type="checkbox"
                {...register}
                id={register?.name}
                className="sr-only"
                value={value}
                defaultChecked={defaultChecked}
            />
            <div className="flex justify-evenly items-center w-full mr-3 ml-5">
                <div
                    className={clsx("cursor-pointer", {
                        "border-[1.4px] border-dtech-new-main-light h-5 ml-0":
                            defaultChecked,
                    })}
                ></div>
                <div className="flex flex-row justify-between items-center w-full text-gray-500 hover:text-black" onClick={() =>  ref.current != null && ref.current.click()}>
                    <div>
                        <label
                            className="cursor-pointer"
                            htmlFor={register?.name}
                            onClick={() => {}}
                            ref={ref}
                        >
                            {label && (
                                <span className="ml-2 text-sm flex">{label}</span>
                            )}
                        </label>
                    </div>
					<div className="ml-2 text-xs">
					    {count}
					</div>
                </div>
            </div>
        </div>
    );
};

export default FilterCheckboxField;
