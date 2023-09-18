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
import SourceArrowWhite from "public/images/icons/source_arrow_white.svg";
import CiteQuotes from "public/images/icons/cite_quote.svg";
import { useRouter } from "next/router";
import Cite from "pages/datasets/components/cite";

type NewResultCardActionProps = {
    data: Data | undefined;
    setData: Function;
    href: string;
    className?: string;
    gridClass?: string;
    owner?:string
};
const NewResultCardAction = ({
    data,
    setData,
    href,
    className = "",
    gridClass = "",
    owner=""
}: NewResultCardActionProps) => {
    const [share, setShare] = useState(false);
    const [shareClicked, setShareClicked] = useState<boolean>(false);
    const [bookmarkClicked, setBookmarkClicked] = useState<boolean>(false);
    const [favouriteClicked, setFavouriteClicked] = useState<boolean>(false);
    const [arrowActive, setArrowActive] = useState<boolean>(false);
    const router = useRouter();
    const cite = `${data?.dataProviders?.hostName}. ${data?.title}. ${owner}. `
    if (!data) {
        return null;
    }
    const onFav = () => setData({ ...data, isFavourited: !data.isFavourited });

    const handleClosePopup = () => {
        setShare(false);
    };

    const shareColor = shareClicked
        ? " !text-white !bg-dtech-main-dark"
        : " !text-dtech-new-main-light ";

    const bookmarkColor = bookmarkClicked
        ? " !text-white !bg-dtech-main-dark "
        : " !text-dtech-new-main-light";

    const favouriteColor = favouriteClicked
    ? " !text-white !bg-dtech-main-dark "
    : " !text-dtech-new-main-light";

    return (
        <div className={clsx("flex", className)}>
            <div
                className={clsx(
                    "grid grid-flow-col md:grid-cols-2 md:grid-flow-row gap-8 md:gap-6",
                    gridClass
                )}
            >
                <div className=" flex flex-col justify-center items-center">
                    <a href={data?.url} target="_blank" rel="noreferrer">
                        {!href?.includes("dataset") ? (
                            <div className="hover:bg-[#6DCDCB] hover:bg-opacity-[55%]  px-2 pt-2">
                                <BsGlobe className="sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer" />
                            </div>
                        ) : (
                            <div className="hover:bg-[#6DCDCB] hover:bg-opacity-[55%]  active:bg-dtech-main-dark !hover:text-white px-2 pt-2 ml-1"
                            onMouseDown={() => setArrowActive(true)}
                            onMouseUp={() => setArrowActive(false)}
                            onMouseLeave={() => setArrowActive(false)}
                            >
                                <Image src={arrowActive ? SourceArrowWhite :SourceArrow} width={"25"} height={"25"} className="" />
                            </div>
                        )}
                    <div className="text-[#0065BD] underline underline-offset-2 cursor-pointer w-max text-base font-roboto">
                        {!href?.includes("dataset") ? "Website" : "Source"}
                    </div>
                    </a>
                </div>
                <div className=" flex flex-col justify-center items-center">
                    <div
                        className={` hover:bg-[#6DCDCB] hover:bg-opacity-[55%]  px-2 pt-2 mb-[-10px] active:bg-dtech-main-dark !hover:text-white ${favouriteColor}`}
                        onMouseDown={() => setFavouriteClicked(true)}
                        onMouseUp={() => setFavouriteClicked(false)}
                        onMouseLeave={() => setFavouriteClicked(false)}
                    >
                        <FavouriteBtn
                            className="mx-auto"
                            datasetStats={data}
                            recordType={data.recordType}
                            onFavouriteChange={onFav}
                        />
                    </div>
                    <div className="text-[#727272] mt-2 text-base font-roboto">Like</div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                    <div
                        className={`hover:bg-[#6DCDCB] hover:bg-opacity-[55%]  px-2 pt-2 mb-[-10px]  active:bg-dtech-main-dark !hover:text-white ${bookmarkColor}`}
                        onMouseDown={() => setBookmarkClicked(true)}
                        onMouseUp={() => setBookmarkClicked(false)}
                        onMouseLeave={() => setBookmarkClicked(false)}
                    >
                        <BookmarkBtn
                            className="mx-auto"
                            data={data}
                            recordType={data.recordType}
                            bookmarkColor={bookmarkColor}
                        />
                    </div>
                    <div className= "text-[#727272] mt-2 text-base font-roboto ">Save</div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                    <Menu>
                        {({ open }) => (
                            <>
                                <Menu.Button>
                                    <div
                                        data-tip="Share on social media"
                                        className={`hover:bg-[#6DCDCB] hover:bg-opacity-[55%] text-dtech-main-light px-2 pt-2 pb-2 mb-[-10px]  ${shareColor}`}
                                        onMouseDown={() =>
                                            setShareClicked(true)
                                        }
                                        onMouseUp={() => setShareClicked(false)}
                                        onMouseLeave={() =>
                                            setShareClicked(false)
                                        }
                                    >
                                        <BsShareFill
                                            className={`sm:h-6 sm:w-6 h-4 w-4  cursor-pointer`}
                                            data-modal-toggle="popup"
                                            onClick={() => setShare(true)}
                                        />
                                    </div>
                                    <ReactTooltip uuid="dtechtive-share-btn-tooltip" textColor={'white'}  backgroundColor="#4CA7A5" />
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
                    <div className="text-[#727272] mt-2 text-base font-roboto">Share</div>
                </div>
                {/* {router.pathname == "/datasets/[id]" && (
                    <Cite citation={cite} url={`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${router.asPath}`} />
                )} */}
            </div>
        </div>
    );
};
export default NewResultCardAction;
