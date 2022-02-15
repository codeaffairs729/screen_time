import clsx from "clsx";
import Image from "next/image";
import ReactTooltip from "react-tooltip";

const InfoIcon = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => {
  return (
    <span
      className={clsx("inline-flex items-center justify-center", className)}
    >
      <Image
        data-tip={title}
        src="/images/icons/info.svg"
        width="16px"
        height="16px"
        alt={title}
      />
      <ReactTooltip uuid="dtechtive-info-tooltip" />
    </span>
  );
};

export default InfoIcon;
