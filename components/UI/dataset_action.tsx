import { useState } from "react";
import toast from "react-hot-toast";
import {
    BsShareFill,
    BsHeartFill,
    BsFillBookmarkPlusFill,
    BsHeart,
    BsBookmarkPlus,
} from "react-icons/bs";
import FavouriteBtn from "./buttons/favourite_btn.v4";
import Popup from "./popup";
import BookmarkBtn from "./user_bookmark/bookmark_btn";
type DatasetActionProps = {
    dataset: any;
    favourite?: Boolean;
    bookmark?: Boolean;
    onFavourite?: Function;
    handleBookmark?: Function;
    handleShare: Function;
};
const DatasetAction = ({
    dataset,
    onFavourite,
    handleBookmark,
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
                <FavouriteBtn
                    className="mx-auto"
                    datasetStats={dataset}
                    onFavouriteChange={() => {}}
                />
                <BookmarkBtn className="mx-auto" dataset={dataset} />
            </div>
            {share && <Popup />}
        </div>
    );
};
export default DatasetAction;
