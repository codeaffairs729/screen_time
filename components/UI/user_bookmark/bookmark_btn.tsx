import clsx from "clsx";
import Dataset from "models/dataset.model";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";
import Loader from "../loader";
import BookmarkModal from "./bookmark_modal";
import {
    BsBookmark,
    BsBookmarkFill,
    BsBookmarkPlus,
    BsFillBookmarkPlusFill,
} from "react-icons/bs";

const BookmarkBtn = ({
    className = "",
    data,
    recordType = "dataset",
    onBookmarkChange,
    bookmarkColor = "",
}: {
    className?: string;
    data: any;
    recordType?: string;
    onBookmarkChange?: () => void;
    bookmarkColor?: string;
}) => {
    // const { handleBookmark, isBookmarked, isHandlingBookmark, user } =
    //     useBookmarkDataset(dataset, onBookmarkChange);

    const { isBookmarked, isHandlingBookmark, user } = useBookmarkDataset(data);

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <BookmarkModal
                showModal={showModal}
                setShowModal={setShowModal}
                data={data}
                recordType={recordType}
            />
            <div
                className="inline-block active:bg-dtech-main-dark active:!text-white"
                data-tip={
                    !user
                        ? "Please login to bookmark this dataset."
                        : "Add to lists"
                }
            >
                <button
                    aria-label="bookmark dataset"
                    data-selector="bookmark-btn"
                    // onClick={handleBookmark}
                    onClick={() => setShowModal(true)}
                    disabled={!user}
                    className={clsx(
                        "flex items-center justify-center relative",
                        className
                    )}
                >
                    {!user ? (
                        <BsBookmark
                            className={`sm:h-6 sm:w-6 h-4 w-4  cursor-pointer text-dtech-new-main-light  active:bg-dtech-main-dark active:!text-white ${bookmarkColor}`}
                        />
                    ) : (
                        <>
                            {!isHandlingBookmark ? (
                                <>
                                    {isBookmarked ? (
                                        <BsBookmarkFill
                                            className={`sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer  active:bg-dtech-main-dark active:!text-white ${bookmarkColor}`}
                                        />
                                    ) : (
                                        <BsBookmark
                                            className={`sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light  cursor-pointer  active:bg-dtech-main-dark active:!text-white ${bookmarkColor}`}
                                        />
                                    )}
                                </>
                            ) : (
                                <Loader className="m-0.5" />
                            )}
                        </>
                    )}
                </button>
                <ReactTooltip
                    uuid="dtechtive-bookmark-btn-tooltip"
                    textColor={"white"}
                    backgroundColor="#4CA7A5"

                    overridePosition={({ left, top }, _e, _t, node) => {
                        return {
                            top,
                            left:
                                typeof node === "string" ? left : Math.max(left, 0),
                        };
                    }}
                />
            </div>
        </>
    );
};

/**
 * Bookmark a dataset
 */
const useBookmarkDataset = (data: any) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const user_bookmarks = useSelector(
        (state: RootState) => state.user.bookmarkItems
    );
    let isBookmarked = false;
    const isHandlingBookmark = false;

    user_bookmarks?.forEach((item: any) => {
        if (item.datasetID === data.id || item.organisationID === data.id) {
            isBookmarked = true;
        }
    });

    return {
        isBookmarked,
        isHandlingBookmark,
        user,
    };
};

export default BookmarkBtn;
