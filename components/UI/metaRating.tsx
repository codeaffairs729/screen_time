import StarRating from "components/UI/star_rating";
import InfoIcon from "components/UI/icons/info_icon";
type MetaRatingProps = {
    dataQuality: number;
    displayContext?: String;
};
const MetaRating = ({ dataQuality, displayContext = "" }: MetaRatingProps) => {
    return (
        <div
            data-testid={displayContext}
            className={"flex space-x-1 flex-col ml-4"}
        >
            <span className="text-xs whitespace-nowrap relative">
                <span className="text-m">Metadata Quality</span>
                <InfoIcon
                    oldIcon={false}
                    iconClasses="absolute left-[100%] top-[-25%] ml-[1px] h-3.5 w-3.5 text-black"
                    title={"Quality Rating"}
                />
            </span>
            <span className="text-xs">
                <StarRating
                    starClassName="text-black h-4 w-4"
                    rating={dataQuality}
                />
            </span>
        </div>
    );
};
export default MetaRating;