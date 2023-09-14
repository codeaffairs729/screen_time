import { ReactNode, useState } from "react";
import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon";
import { VscTriangleDown } from "react-icons/vsc";
import { BsChevronDown } from "react-icons/bs";

const FilterSection = ({
    label,
    disable,
    children,
    dataSelector,
}: {
    label: string;
    disable?: boolean;
    children: ReactNode;
    dataSelector?: string;
}) => {
    const [hideFilters, setHideFilters] = useState<boolean>(true);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <div data-selector={dataSelector} className={`${disable? "hidden": ""}`}>
            <div
                className={`${
                    disable ? "cursor-not-allowed bg-dtech-light-grey" : hideFilters ?"  cursor-pointer " : " text-white bg-dtech-new-main-light cursor-pointer"
                }   hover:bg-[#6DCDCB] hover:bg-opacity-50 text-gray-500 hover:text-black `}
                onClick={() => setHideFilters(!hideFilters)}
                onMouseEnter={()=>setIsHovered(true)}
                onMouseLeave={()=>setIsHovered(false)}
            >
                <div className=" flex justify-between items-center mx-3 hover:text-black">
                    <h4
                        className={`${
                            disable
                                ? "text-gray-300"
                                : hideFilters
                                ? " "
                                : "text-white"
                        } text-sm pr-2 py-1.5 ${isHovered&&"text-black"}  `}
                    >
                        {label}
                    </h4>
                    <BsChevronDown
                        className={`
                        ${
                            disable
                                ? "text-gray-300"
                                : hideFilters
                                ? ""
                                : "text-white  rotate-180"
                        }
                        transition-all h-4 w-6 ${isHovered&&"text-black"} `}
                        strokeWidth="2"
                    />
                    {/* <VscTriangleDown
                        className={`
                    ${
                        disable
                            ? "text-gray-800"
                            : hideFilters
                            ? "text-dtech-main-dark"
                            : "text-dtech-main-dark rotate-180"
                    }
                    transition-all h-4 w-4`}
                    /> */}
                </div>
            </div>
            <div
                className={`overflow-auto transition-all duration-300 	${
                    disable || hideFilters ? "max-h-0" : "max-h-80 my-2"
                }`}
            >
                {children}
            </div>
            <div className="mb-4"></div>
        </div>
    );
};

export default FilterSection;
