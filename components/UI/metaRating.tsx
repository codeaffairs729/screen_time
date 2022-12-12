import StarRating from "components/UI/star_rating";
import InfoIcon from "components/UI/icons/info_icon";
import clsx from "clsx";
type MetaRatingProps = {
    dataQuality: number;
    label?: String;
    displayContext?: String;
    className?: String;
    labelClass?: String;
    starClassName?: String;
};
const MetaRating = ({
    dataQuality,
    displayContext = "",
    label = "Metadata Quality",
    className = "",
    labelClass = "",
    starClassName = "",
}: MetaRatingProps) => {
    return (
        <div
            data-testid={displayContext}
            className={clsx(className, "flex space-x-1 flex-col ml-4")}
        >
            <span className="text-xs whitespace-nowrap relative mr-6">
                <span className={clsx(labelClass, "text-m")}>{label}</span>
                <InfoIcon
                    oldIcon={false}
                    iconClasses="absolute left-[100%] top-[-25%] ml-[1px] h-3.5 w-3.5 text-black"
                    title={"Quality Rating"}
                />
            </span>
            <span className="text-xs">
                <StarRating
                    starClassName={clsx(starClassName, "text-black h-4 w-4")}
                    rating={dataQuality}
                />
            </span>
        </div>
    );
};
export default MetaRating;
