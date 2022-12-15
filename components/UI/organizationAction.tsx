import {
    BsShareFill,
    BsHeartFill,
    BsFillBookmarkPlusFill,
    BsHeart,
    BsBookmarkPlus,
} from "react-icons/bs";
import Popup from "./popup";
type OrganizationActionProps = {
    favourite: Boolean;
    bookmark: Boolean;
    popup: Boolean;
    onFavourite: Function;
    handleBookmark: Function;
    handleShare: Function;
};
const OrganizationAction = ({
    favourite,
    bookmark,
    popup,
    onFavourite,
    handleBookmark,
    handleShare,
}: OrganizationActionProps) => {
    return (
        <div>
            <div className="flex">
                <BsShareFill
                    className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer "
                    data-modal-toggle="popup"
                    onClick={() => handleShare()}
                />

                {bookmark ? (
                    <BsFillBookmarkPlusFill
                        className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer"
                        onClick={() => {
                            handleBookmark();
                        }}
                    />
                ) : (
                    <BsBookmarkPlus
                        className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer"
                        onClick={() => {
                            handleBookmark();
                        }}
                    />
                )}
                {favourite ? (
                    <BsHeartFill
                        className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer"
                        onClick={() => {
                            onFavourite();
                        }}
                    />
                ) : (
                    <BsHeart
                        className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer"
                        onClick={() => {
                            onFavourite();
                        }}
                    />
                )}
            </div>
            {popup && <Popup />}
        </div>
    );
};
export default OrganizationAction;
