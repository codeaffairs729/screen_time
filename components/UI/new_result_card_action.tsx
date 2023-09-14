import { useState } from "react";
import { BsGlobe, BsShareFill } from "react-icons/bs";
import FavouriteBtn from "./buttons/favourite_btn.v4";
import Popup from "./popup";
import BookmarkBtn from "./user_bookmark/bookmark_btn";
import { Menu, Transition } from "@headlessui/react";
import { Data } from "./result_card";
import ReactTooltip from "react-tooltip";
import clsx from "clsx";
import Image from "next/image";
import SourceArrow from "public/images/icons/source_arrow.svg";
import CiteQuotes from "public/images/icons/cite_quote.svg";
import { useRouter } from "next/router";

type NewResultCardActionProps = {
    data: Data | undefined;
    setData: Function;
    href: string;
    className?: string;
    gridClass?: string;
};
const NewResultCardAction = ({
    data,
    setData,
    href,
    className = "",
    gridClass = "",
}: NewResultCardActionProps) => {
    const [share, setShare] = useState(false);
    const router = useRouter();

    if (!data) {
        return null;
    }
    const onFav = () => setData({ ...data, isFavourited: !data.isFavourited });

    const handleClosePopup = () => {
        setShare(false);
    };

    return (
        <div className={clsx("flex", className)}>
            <div
                className={clsx(
                    "grid grid-flow-col md:grid-cols-2 md:grid-flow-row gap-12 md:gap-6",
                    gridClass
                )}
            >
                <div className=" flex flex-col justify-center items-center">
                    <a href={data?.url} target="_blank" rel="noreferrer">
                        {!href?.includes("dataset") ? (
                            <BsGlobe className="sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer " />
                        ) : (
                            <Image src={SourceArrow} />
                        )}
                    </a>
                    <div className="text-dtech-new-main-light w-max">
                        {!href?.includes("dataset") ? "Website" : "Source"}
                    </div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                    <FavouriteBtn
                        className="mx-auto "
                        datasetStats={data}
                        recordType={data.recordType}
                        onFavouriteChange={onFav}
                    />
                    <div className="text-dtech-new-main-light mt-2">Like</div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                    <BookmarkBtn
                        className="mx-auto "
                        data={data}
                        recordType={data.recordType}
                    />
                    <div className="text-dtech-new-main-light mt-2">Save</div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                    <Menu>
                        {({ open }) => (
                            <>
                                <Menu.Button>
                                    <div data-tip="Share on social media">
                                        <BsShareFill
                                                className="sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer"
                                                data-modal-toggle="popup"
                                                onClick={() => setShare(true)}
                                            />
                                    </div>
                                    <ReactTooltip uuid="dtechtive-share-btn-tooltip" />
                                </Menu.Button>
                                <Transition show={open && share}>
                                    <Menu.Items static className="">
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
                    <div className="text-dtech-new-main-light mt-2">Share</div>
                </div>
                {router.pathname == "/datasets/[id]" && (
                    <div className=" flex flex-col justify-center items-center">
                        <Image src={CiteQuotes} />
                        <div className="text-dtech-new-main-light mt-2">
                            Cite
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default NewResultCardAction;
