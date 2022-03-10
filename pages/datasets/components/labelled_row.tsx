import InfoIcon from "components/UI/icons/info_icon";
import StarRating from "components/UI/star_rating";
import { ReactNode } from "react";

const LabelledRow = ({
  label,
  tooltip,
  children,
}: {
  label: string;
  tooltip: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex mb-2 space-x-1">
      <span className="text-xs font-medium whitespace-nowrap">
        {label} <InfoIcon title={tooltip} />:
      </span>
      <span className="text-xs">{children}</span>
    </div>
  );
};

export default LabelledRow;