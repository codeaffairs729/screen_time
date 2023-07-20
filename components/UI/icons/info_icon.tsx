import clsx from "clsx";
import Image from "next/image";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

const InfoIcon = ({
    title,
    className = "",
    oldIcon = true,
    iconClasses = "",
    onClick,
    tooltipClassName
}: {
    title: string;
    className?: string;
    oldIcon?: boolean;
    onClick?: Function;
    iconClasses?: string;
    tooltipClassName?: string
}) => {
    const tooltipId = `dtechtive-info-tooltip-${uuidv4()}`;
    return (
        <span
            onClick={() => onClick && onClick()}
            className={clsx(
                "inline-flex items-center justify-center align-middle",
                className
            )}
        >
            {/* <Image
                data-tip={title}
                src="/images/icons/info.svg"
                data-for={tooltipId}
                width="16px"
                height="16px"
                alt={title}
            /> */}
            <span data-tip={title} data-for={tooltipId}>
                {oldIcon ? (
                    <BsInfoCircle
                        data-tip={title}
                        data-for={tooltipId}
                        className={clsx("h-4 w-4 text-gray-600", iconClasses)}
                        aria-hidden="true"
                    />
                ) : (
                    <AiOutlineInfoCircle
                        data-tip={title}
                        data-for={tooltipId}
                        className={clsx("h-4 w-4 text-gray-600", iconClasses)}
                        aria-hidden="true"
                    />
                )}
            </span>
            <ReactTooltip
                className={tooltipClassName}
                id={tooltipId}
                overridePosition={({ left, top }, _e, _t, node) => {
                    return {
                        top,
                        left:
                            typeof node === "string" ? left : Math.max(left, 0),
                    };
                }}
            />
        </span>
    );
};

export default InfoIcon;
