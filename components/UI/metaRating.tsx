import StarRating from "components/UI/star_rating";
import InfoIcon from "components/UI/icons/info_icon";
import clsx from "clsx";
import { useRouter } from "next/router";
type MetaRatingProps = {
    dataQuality: number;
    label?: String;
    displayContext?: String;
    className?: String;
    labelClass?: String;
    starClassName?: String;
    title?: string;
    handleFAQClick?: Function;
    infoClassName?: string;
    showToolTip?: boolean
};

const MetaRating = ({
    dataQuality,
    displayContext = "",
    label = "Metadata Quality",
    className = "",
    labelClass = "",
    starClassName = "",
    infoClassName = "",
    title = "",
    handleFAQClick,
    showToolTip=true,
}: MetaRatingProps) => {
    const router = useRouter()
    return (
        <div
            data-testid={displayContext}
            className={clsx(className, "flex space-x-1 flex-col")}
        >
            <span className="text-xs whitespace-nowrap relative mr-6">
                <span className={clsx(labelClass, router.pathname =="/datasets/[id]"&&"lg:text-dtech-new-main-light lg:!font-semibold lg:!text-lg text:m", "text-m")}>{label}</span>
                {showToolTip &&<InfoIcon
                    onClick={handleFAQClick}
                    oldIcon={false}
                    iconClasses={clsx(infoClassName,"absolute left-[100%]  ml-[1px] h-3.5 w-3.5 text-black outline-none cursor-pointer")}
                    title={title}
                />}
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
