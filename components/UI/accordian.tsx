import Image from "next/image";
import { ReactNode, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
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
                className="cursor-pointer flex items-center justify-between p-4 rounded"
            >
                <span>{label}</span>
                <span>
                    {selected ? (
                        stateIcon ? (
                            { stateIcon }
                        ) : (
                            <AiOutlineMinus className="w-8 h-8 text-dtech-main-dark" />
                        )
                    ) : stateIcon ? (
                        { stateIcon }
                    ) : (
                        <AiOutlinePlus className="w-8 h-8 text-dtech-main-dark" />
                    )}
                </span>
            </div>
            <div
                className={`${
                    selected ? "max-h-[100vh]" : "max-h-0"
                } overflow-hidden transition-all`}
            >
                {children}
            </div>
        </div>
    );
};

export default Accordian;
