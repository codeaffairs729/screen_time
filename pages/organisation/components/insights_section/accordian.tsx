import Image from "next/image";
import { ReactNode, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import plus from "public/images/icons/plus_white.svg";
import minus from "public/images/icons/minus.svg";
import clsx from "clsx";

const Accordian = ({
    children,
    label,
    stateIcon,
    className = "",
}: {
    children: ReactNode;
    label: string | ReactNode;
    stateIcon?: ReactNode;
    className?: string;
}) => {
    const [selected, setSelected] = useState<boolean>(false);
    return (
        <div
            className={`${selected ? "" : ""
                } w-full  border-b-[1px] ${className}`}
            key={1243141241}
        >
            <div
                onClick={() => setSelected(!selected)}
                className={clsx("cursor-pointer   flex items-center justify-between px-4 py-4 font-semibold text-[#727272]", selected && "!bg-dtech-new-main-light !text-white ")}
            >
                <span className="">{label}</span>
                <span className="select-none">
                    {selected ? (
                        stateIcon ? (
                            { stateIcon }
                        ) : <Image
                            src={plus}
                            alt=""
                            height={12}
                            width={12}
                            className="select-none rotate-45"
                        />
                    ) : stateIcon ? (
                        { stateIcon }
                    ) : (
                        <Image
                            src={plus}
                            alt=""
                            height={12}
                            width={12}
                            className="select-none rotate-45"
                        />
                    )}
                </span>
            </div>
            {selected && <div
                className={`${selected ? "" : "max-h-0"
                    } overflow-hidden transition-all duration-300 items-center`}
            >
            {children}
            </div>}
        </div>
    );
};

export default Accordian;
