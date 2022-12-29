import { useState } from "react";
import { BsShareFill } from "react-icons/bs";
import FavouriteBtn from "./buttons/favourite_btn.v4";
import Popup from "./popup";
import BookmarkBtn from "./user_bookmark/bookmark_btn";
type ResultCardActionProps = {
    data: any;
    favourite?: Boolean;
    bookmark?: Boolean;
    onFavourite?: Function;
    handleBookmark?: Function;
    handleShare: Function;
};
const ResultCardAction = ({ data }: ResultCardActionProps) => {
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
                    datasetStats={data}
                    recordType={data.recordType}
                    onFavouriteChange={() => {}}
                />
                <BookmarkBtn className="mx-auto" dataset={data} />
            </div>
            {share && <Popup />}
        </div>
    );
};
export default ResultCardAction;
