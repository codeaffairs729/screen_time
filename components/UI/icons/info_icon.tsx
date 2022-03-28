import clsx from "clsx";
import Image from "next/image";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from 'uuid';

const InfoIcon = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => {
  const tooltipId = `dtechtive-info-tooltip-${uuidv4()}`;
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center align-middle",
        className
      )}
    >
      <Image
        data-tip={title}
        src="/images/icons/info.svg"
        data-for={tooltipId}
        width="16px"
        height="16px"
        alt={title}
      />
      <ReactTooltip
        id={tooltipId}
        overridePosition={({ left, top }, _e, _t, node) => {
          return {
            top,
            left: typeof node === "string" ? left : Math.max(left, 0),
          };
        }}
      />
    </span>
  );
};

export default InfoIcon;
