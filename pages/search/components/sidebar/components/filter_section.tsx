import { ReactNode, useState } from "react";
import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon";
import { VscTriangleDown } from "react-icons/vsc";

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
    return (
        <div data-selector={dataSelector}>
            <div
                className={`${
                    disable ? "cursor-not-allowed" : " cursor-pointer"
                } bg-dtech-main-light rounded`}
                onClick={() => setHideFilters(!hideFilters)}
            >
                <div className=" flex justify-between items-center mx-3">
                    <h4
                        className={`${
                            disable
                                ? "text-gray-300"
                                : hideFilters
                                ? "text-dtech-main-dark "
                                : "text-dtech-main-dark"
                        } text-sm font-medium pr-2 py-1.5`}
                    >
                        {label}
                    </h4>
                    <VscTriangleDown
                        className={`
                    ${
                        disable
                            ? "text-gray-800"
                            : hideFilters
                            ? "text-dtech-main-dark"
                            : "text-dtech-main-dark rotate-180"
                    }
                    transition-all h-4 w-4`}
                    />
                </div>
            </div>
            <div
                className={`overflow-auto transition-all duration-300	${
                    disable || hideFilters ? "max-h-0" : "max-h-80 my-2 ml-3"
                }`}
            >
                {children}
            </div>
            <div className="mb-4"></div>
        </div>
    );
};

export default FilterSection;
