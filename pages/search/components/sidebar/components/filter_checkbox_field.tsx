import clsx from "clsx";
import StarRating from "components/UI/star_rating";
import { useRef, useState, forwardRef, RefObject, ReactNode } from "react";
import {
    Controller,
    UseFormRegisterReturn,
    useFormContext,
} from "react-hook-form";

const FilterCheckboxField = ({
    label,
    register,
    value,
    className = "",
    defaultChecked,
    count,
    dataSelector,
    control,
    name,
    setValue,
    stars,
}: {
    label?: string;
    value?: any;
    register?: UseFormRegisterReturn;
    className?: string;
    defaultChecked: boolean;
    count: string;
    dataSelector?: string;
    name?: any;
    control?: any;
    setValue?: any;
    stars?: any;
}) => {
    const handleOuterDivClick = () => {
        setValue(name, !defaultChecked);
    };

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
            onClick={handleOuterDivClick}
        >
            <input
                type="checkbox"
                name={name}
                {...register} // Assuming you are using register
                checked={defaultChecked}
                onChange={(e) => {
                    setValue(name, e.target.checked);
                }}
                className="sr-only"
            />
            <div className="flex justify-evenly items-center w-full mr-3 ml-5">
                <div
                    className={clsx("cursor-pointer", {
                        "border-[1.4px] border-dtech-new-main-light h-5 ml-0":
                            defaultChecked,
                    })}
                ></div>
                <div className="flex flex-row justify-between items-center w-full text-gray-500 hover:text-black mr-5">
                    {!stars && (
                        <div>
                            <label className="cursor-pointer">
                                {label && (
                                    <span className="ml-2 text-sm flex">
                                        {label}{" "}
                                    </span>
                                )}
                            </label>
                        </div>
                    )}
                    <div className="ml-2 text-xs flex flex-row">
                        {`${count}`}{(name.indexOf('metadata_quality') == 0) ? " & up" : ""}
                        {stars && (
                            <div className="ml-2">
                                <StarRating rating={stars} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCheckboxField;

/**
 * 
 * 
    <div
            data-selector={dataSelector}
            className={clsx("flex items-start mb-1.5", className)}
        >
            <input
                type="checkbox"
                {...register}
                className="focus:ring-0 rounded-sm border-dtech-main-dark text-dtech-main-dark"
                value={value}
                defaultChecked={defaultChecked}
            />
            {label && (
                <span className="ml-2 text-sm">{label}</span>
            )}
        </div>
 */

const StarRow = ({
    stars,
    children,
}: {
    stars: number;
    children: ReactNode;
}) => {
    return (
        <div className="flex items-center justify-start">
            {children}
            <StarRating rating={stars} />
        </div>
    );
};
