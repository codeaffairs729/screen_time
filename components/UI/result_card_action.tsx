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
    const handleClosePopup = () => {
        setShare(false);
    };
    return (
        // <div>
        <div className={clsx("flex", className)}>
            <div className=" flex flex-row justify-evenly items-center w-full h-full ">
                <div className=" flex justify-center items-center flex-col  hover:bg-[#6DCDCB] hover:bg-opacity-[55%] hover:rounded-md px-2 py-4">
                    <a href={data?.url} target="_blank" rel="noreferrer" >
                        <BsGlobe
                            className="sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer "
                        />
                    </a>
                    <div className="text-[#0065BD] underline w-max">{!href?.includes("dataset")?"Website":"Source"}</div>
                </div>
                <div className=" flex justify-center items-center flex-col sm:ml-0 ml-4   hover:bg-[#6DCDCB] hover:bg-opacity-[55%] hover:rounded-md px-3 py-4">
 
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
                <div className=" flex justify-center items-center flex-col sm:ml-5 hover:bg-[#6DCDCB] hover:bg-opacity-[55%] hover:rounded-md px-3 py-4">

                    <BookmarkBtn
                        className="mx-auto "
                        data={data}
                        recordType={data.recordType}
                    />
                    <div className="text-dtech-new-main-light">Save</div>

                </div>
                <div className=" flex justify-center items-center flex-col sm:ml-4 hover:bg-[#6DCDCB] hover:bg-opacity-[55%] hover:rounded-md px-2 py-4">

                    <Menu>
                        {({ open }) => (
                            <>
                                <Menu.Button>
                                    <div
                                        data-tip
                                        data-for="dtechtive-share-btn-tooltip"
                                    >
                                        <BsShareFill
                                            className="sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer "
                                            data-modal-toggle="popup"
                                            onClick={() => setShare(!share)}
                                        />
                                    </div>
                                    <ReactTooltip
                                        id="dtechtive-share-btn-tooltip"
                                        textColor={'white'}
                                        backgroundColor="#4CA7A5"
                                        className="w-60 !bg-dtech-dark-teal"
                                        overridePosition={({ left, top }, _e, _t, node) => {
                                            return {
                                                top,
                                                left:
                                                    typeof node === "string" ? left : Math.max(left, 0),
                                            };
                                        }}
                                    >
                                        {"Share on social media"}
                                    </ReactTooltip>
                                </Menu.Button>
                                <Transition show={share}>
                                    <Menu.Items static className="">
                                        {<div onClick={handleClosePopup} className={share ? ` bg-black fixed opacity-50 h-[3000px] top-0 left-0 right-0 bottom-0 sm:h-[3000px] w-screen flex items-center  z-10` : ""}></div>}
                                        <Popup
                                            href={href}
                                            dataset={data.title}
                                            onClose={handleClosePopup}
                                        />
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
