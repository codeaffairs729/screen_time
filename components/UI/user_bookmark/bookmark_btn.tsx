import clsx from "clsx";
import Dataset from "models/dataset.model";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";
import Loader from "../loader";
import BookmarkModal from "./bookmark_modal";
import { BsBookmarkPlus, BsFillBookmarkPlusFill } from "react-icons/bs";

const BookmarkBtn = ({
    className = "",
    dataset,
    onBookmarkChange,
}: {
    className?: string;
    dataset: any;
    onBookmarkChange?: () => void;
}) => {
    // const { handleBookmark, isBookmarked, isHandlingBookmark, user } =
    //     useBookmarkDataset(dataset, onBookmarkChange);

    const { isBookmarked, isHandlingBookmark, user } =
        useBookmarkDataset(dataset);

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <BookmarkModal
                showModal={showModal}
                setShowModal={setShowModal}
                dataset={dataset}
            />
            <div
                className="inline-block"
                data-tip={
                    !user ? "Please login to bookmark this dataset." : null
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
                        <BsBookmarkPlus className="w-5 h-5 text-gray-600" />
                    ) : (
                        <>
                            {!isHandlingBookmark ? (
                                <>
                                    {isBookmarked ? (
                                        <BsFillBookmarkPlusFill className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer" />
                                    ) : (
                                        <BsBookmarkPlus className="h-6 w-6 ml-4 text-dtech-main-dark cursor-pointer" />
                                    )}
                                </>
                            ) : (
                                <Loader className="m-0.5" />
                            )}
                        </>
                    )}
                </button>
                <ReactTooltip uuid="dtechtive-favourite-btn-tooltip" />
            </div>
        </>
    );
};

/**
 * Bookmark a dataset
 */
const useBookmarkDataset = (dataset: Dataset) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const user_bookmarks = useSelector(
        (state: RootState) => state.user.bookmarkItems
    );
    let isBookmarked = false;
    const isHandlingBookmark = false;

    user_bookmarks?.forEach((item: any) => {
        if (item.datasetID === dataset.id) {
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
