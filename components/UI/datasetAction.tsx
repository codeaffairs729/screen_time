import { useState } from "react";
import {
    BsShareFill,
    BsHeartFill,
    BsFillBookmarkPlusFill,
    BsHeart,
    BsBookmarkPlus,
} from "react-icons/bs";
import Popup from "./popup";
import BookmarkBtn from "./user_bookmark/bookmark_btn";
type DatasetActionProps = {
    favourite?: Boolean;
    bookmark?: Boolean;
    onFavourite?: Function;
    handleBookmark?: Function;
    handleShare: Function;
};
const DatasetAction = ({
    // favourite = false,
    // bookmark = false,
    // onFavourite,
    // handleBookmark,
    handleShare,
}: DatasetActionProps) => {
    const [share, setShare] = useState(false);
    return (
        <div>
            <div className="flex">
                <BsShareFill
                    className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer "
                    data-modal-toggle="popup"
                    onClick={() => setShare(!share)}
                />

                {/* <BookmarkBtn className="mx-auto" dataset={dataset} /> */}
                {/* {favourite ? (
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
                )} */}
            </div>
            {share && <Popup />}
        </div>
    );
};
export default DatasetAction;
