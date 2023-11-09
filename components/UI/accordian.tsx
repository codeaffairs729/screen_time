import Image from "next/image";
import { ReactNode, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import plus from "public/images/icons/plus.svg";
import minus from "public/images/icons/minus.svg";
import { BsChevronDown } from "react-icons/bs";

const Accordian = ({
    children,
    label,
    stateIcon,
    className = "",
    pageName = "",
    labelClassName ="",
    arrowIconClass = ""
}: {
    children: ReactNode;
    label: string | ReactNode;
    stateIcon?: ReactNode;
    className?: string;
    pageName?: string;
    labelClassName?: string;
    arrowIconClass?: string;
}) => {
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <div
            className={`${
                selected ? "bg-dtech-main-light" : "bg-gray-100"
            } w-full max-w-[768px] my-3 ${className}`}
        >
            <div
                onClick={() => setSelected(!selected)}
                className="cursor-pointer flex items-center justify-between px-4 py-2 rounded"
            >
                <span className={labelClassName}>{label}</span>
                {pageName !== "faq" ? (
                    <span className="select-none">
                        {selected ? (
                            stateIcon ? (
                                { stateIcon }
                            ) : (
                                <Image
                                    src={minus}
                                    alt=""
                                    height={32}
                                    width={32}
                                    className="select-none"
                                />
                            )
                        ) : stateIcon ? (
                            { stateIcon }
                        ) : (
                            <Image
                                src={plus}
                                alt=""
                                height={32}
                                width={32}
                                className="select-none"
                            />
                        )}
                    </span>
                ) : (
                    <span className="select-none">
                        <BsChevronDown
                                className={`${selected && "rotate-180"
                                    } text-xl ${arrowIconClass}    transition-all `}
                                    strokeWidth={1}
                            />
                    </span>
                )}
            </div>
            <div
                className={`${
                    selected ? "max-h-[100vh]" : "max-h-0"
                } overflow-hidden transition-all duration-300 flex items-center`}
            >
                {children}
            </div>
        </div>
    );
};

export default Accordian;
