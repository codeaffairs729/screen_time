import { ReactNode, useState } from "react";
import ChevronDownIcon from '@heroicons/react/solid/ChevronDownIcon';

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
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setHideFilters(!hideFilters)}
            >
                <h4
                    className={`${
                        disable
                            ? "text-gray-300"
                            : hideFilters
                            ? "text-black"
                            : "text-dtech-primary-dark"
                    } text-sm font-medium pr-2 py-2`}
                >
                    {label}
                </h4>
                <ChevronDownIcon
                    className={`
                    ${
                        disable
                            ? "text-gray-300"
                            : hideFilters
                            ? "text-black"
                            : "text-dtech-primary-dark rotate-180"
                    }
                    transition-all h-4 w-4`}
                />
            </div>
            <div
                className={`overflow-auto transition-all duration-300	${
                    disable || hideFilters ? "max-h-0" : "max-h-80"
                }`}
            >
                {children}
            </div>
            <div className="border-b-2 w-5/6"></div>
        </div>
    );
};

export default FilterSection;
