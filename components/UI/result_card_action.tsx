import { useState } from "react";
import { BsGlobe, BsShareFill } from "react-icons/bs";
import FavouriteBtn from "./buttons/favourite_btn.v4";
import Popup from "./popup";
import BookmarkBtn from "./user_bookmark/bookmark_btn";
import { Menu, Transition } from "@headlessui/react";
import { Data } from "./result_card";
import ReactTooltip from "react-tooltip";
import clsx from "clsx";

type ResultCardActionProps = {
    data: Data | undefined;
    setData: Function;
    href: string;
    className?: string;
};
const ResultCardAction = ({
    data,
    setData,
    href,
    className = "",
}: ResultCardActionProps) => {
    const [share, setShare] = useState(false);
    if (!data) {
        return null;
    }
    const onFav = () => setData({ ...data, isFavourited: !data.isFavourited });

    return (
        // <div>
        <div className={clsx("flex", className)}>
            <div className=" flex flex-row justify-evenly items-center w-full h-full">
                <div className=" flex justify-center items-center flex-col">
                    <a href={data?.url} target="_blank" rel="noreferrer" >
                        <BsGlobe
                            className="sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer "
                        />
                    </a>
                    <div className="text-dtech-new-main-light w-max">{!href?.includes("dataset")?"Website":"Source"}</div>
                </div>
                <div className=" flex justify-center items-center flex-col sm:ml-0 ml-4">

                    <FavouriteBtn
                        className="mx-auto "
                        datasetStats={data}
                        recordType={data.recordType}
                        onFavouriteChange={onFav}
                    />
                    <div className="text-dtech-new-main-light">Like</div>

                </div>
            </div>
            <div className=" flex flex-row justify-evenly items-center w-full h-full">
                <div className=" flex justify-center items-center flex-col sm:ml-5">

                    <BookmarkBtn
                        className="mx-auto "
                        data={data}
                        recordType={data.recordType}
                    />
                    <div className="text-dtech-new-main-light">Save</div>

                </div>
                <div className=" flex justify-center items-center flex-col sm:ml-4">

                    <Menu>
                        {({ open }) => (
                            <>
                                <Menu.Button>
                                    <div data-tip="Share on social media">
                                        <BsShareFill
                                            className="sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer "
                                            data-modal-toggle="popup"
                                            onClick={() => setShare(!share)}
                                        />
                                    </div>
                                    <ReactTooltip uuid="dtechtive-share-btn-tooltip" />
                                </Menu.Button>
                                <Transition show={open}>
                                    <Menu.Items static className="">
                                        <Popup href={href} dataset={data.title} />
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                    <div className="text-dtech-new-main-light">Share</div>
                </div>
            </div>
        </div>
        // </div>
    );
};
export default ResultCardAction;
