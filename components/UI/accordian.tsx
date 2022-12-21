import Image from "next/image";
import { ReactNode, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import plus from "public/images/icons/plus.svg";
import minus from "public/images/icons/minus.svg";
const Accordian = ({
    children,
    label,
    stateIcon,
}: {
    children: ReactNode;
    label: string | ReactNode;
    stateIcon?: ReactNode;
}) => {
    const [selected, setSelected] = useState<boolean>(false);
    return (
        <div
            className={`${
                selected ? "bg-dtech-main-light" : "bg-gray-100"
            } w-full max-w-[768px] my-3`}
        >
            <div
                onClick={() => setSelected(!selected)}
                className="cursor-pointer flex items-center justify-between px-4 py-2 rounded"
            >
                <span>{label}</span>
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
            </div>
            <div
                className={`${
                    selected ? "max-h-[100vh]" : "max-h-0"
                } overflow-hidden transition-all duration-300`}
            >
                {children}
            </div>
        </div>
    );
};
export default Accordian;
