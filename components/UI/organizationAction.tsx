import {
    BsShareFill,
    BsHeartFill,
    BsFillBookmarkPlusFill,
} from "react-icons/bs";
type OrganizationActionProps = {
    onFavorite: Function;
    handleBookmark: Function;
    handleShare: Function;
};
const OrganizationAction = ({
    onFavorite,
    handleBookmark,
    handleShare,
}: OrganizationActionProps) => {
    return (
        <div className="flex">
            <BsShareFill
                className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer"
                onClick={() => onFavorite()}
            />
            <BsFillBookmarkPlusFill
                className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer"
                onClick={() => handleBookmark()}
            />
            <BsHeartFill
                className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer"
                onClick={() => handleShare()}
            />
        </div>
    );
};
export default OrganizationAction;
