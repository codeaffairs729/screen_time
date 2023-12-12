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
import SourceArrowTeal from "public/images/icons/source_arrow_teal.svg";
import CiteQuotes from "public/images/icons/cite_quote.svg";
import { useRouter } from "next/router";
import Cite from "pages/datasets/components/cite";

type NewResultCardActionProps = {
    data: Data | undefined;
    setData: Function;
    href: string;
    className?: string;
    gridClass?: string;
    owner?: string;
    cardClicked?: boolean;
    cardHover?: boolean;
};
const NewResultCardAction = ({
    data,
    setData,
    href,
    className = "",
    gridClass = "",
    owner = "",
    cardClicked,
    cardHover,
}: NewResultCardActionProps) => {
    const [share, setShare] = useState(false);
    const [shareClicked, setShareClicked] = useState<boolean>(false);
    const [bookmarkClicked, setBookmarkClicked] = useState<boolean>(false);
    const [favouriteClicked, setFavouriteClicked] = useState<boolean>(false);
    const [arrowActive, setArrowActive] = useState<boolean>(false);
    const router = useRouter();
    const cite = `${data?.dataProviders?.hostName} [owner]. \n${data?.title} [title]. \n${owner} [host]. \n`;

    const { pathname } = router;
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
                    "grid grid-flow-col md:grid-cols-2 md:grid-flow-row gap-3 md:gap-6 lg:gap-8",
                    gridClass
                )}
            >
                {data.recordType !== "topic" && (
                    <div className=" flex flex-col justify-center items-center hover:bg-[#6DCDCB] hover:bg-opacity-[55%] pb-2 px-1 hover:rounded-md">
                        <a href={data?.url} target="_blank" rel="noreferrer">
                            {!href?.includes("dataset") ? (
                                <div className=" active:bg-dtech-main-dark !hover:text-white px-2 pt-2 ml-1">
                                    <BsGlobe
                                        className={`sm:h-6 sm:w-6 h-4 w-4 text-dtech-new-main-light cursor-pointer
                                     ${
                                         (cardClicked || cardHover) &&
                                         " !text-dtech-dark-teal"
                                     }`}
                                    />
                                </div>
                            ) : (
                                <div
                                    className=" active:bg-dtech-main-dark !hover:text-white px-2 pt-2 ml-1"
                                    onMouseDown={() => setArrowActive(true)}
                                    onMouseUp={() => setArrowActive(false)}
                                    onMouseLeave={() => setArrowActive(false)}
                                >
                                    <Image
                                        src={
                                            cardClicked || cardHover
                                                ? SourceArrowTeal
                                                : arrowActive
                                                ? SourceArrowWhite
                                                : SourceArrow
                                        }
                                        width={"25"}
                                        height={"25"}
                                        className=""
                                    />
                                </div>
                            )}
                            <div
                                className={`text-[#0065BD] underline underline-offset-2 cursor-pointer w-max text-base font-roboto ${
                                    !href?.includes("dataset") && "!text-[14px]"
                                }`}
                            >
                                {!href?.includes("dataset")
                                    ? "Website"
                                    : "Source"}
                            </div>
                        </a>
                    </div>
                )}
                {pathname !== "/search" && (
                    <>
                        <div className=" flex flex-col justify-center items-center hover:bg-[#6DCDCB] hover:bg-opacity-[55%] hover:rounded-md">
                            <div
                                className={`  px-2 pt-2 mb-[-10px] active:bg-dtech-main-dark !hover:text-white ${favouriteColor}`}
                                onMouseDown={() => setFavouriteClicked(true)}
                                onMouseUp={() => setFavouriteClicked(false)}
                                onMouseLeave={() => setFavouriteClicked(false)}
                            >
                                <FavouriteBtn
                                    className="mx-auto"
                                    datasetStats={data}
                                    recordType={data.recordType}
                                    onFavouriteChange={onFav}
                                    cardClicked={cardClicked}
                                    cardHover={cardHover}
                                />
                            </div>
                            <div className="text-[#727272] mt-2 text-base font-roboto">
                                Like
                            </div>
                        </div>
                        <div className=" flex flex-col justify-center items-center hover:bg-[#6DCDCB] hover:bg-opacity-[55%] hover:rounded-md">
                            <div
                                className={` px-2 pt-2 mb-[-10px]  active:bg-dtech-main-dark !hover:text-white ${bookmarkColor}`}
                                onMouseDown={() => setBookmarkClicked(true)}
                                onMouseUp={() => setBookmarkClicked(false)}
                                onMouseLeave={() => setBookmarkClicked(false)}
                            >
                                <BookmarkBtn
                                    className="mx-auto "
                                    data={data}
                                    recordType={data.recordType}
                                    bookmarkColor={bookmarkColor}
                                    cardClicked={cardClicked}
                                    cardHover={cardHover}
                                />
                            </div>
                            <div className="text-[#727272] mt-2 text-base font-roboto ">
                                Save
                            </div>
                        </div>
                    </>
                )}
                <div
                    className=" flex flex-col justify-center items-center hover:bg-[#6DCDCB] hover:bg-opacity-[55%] pb-2 hover:rounded-md cursor pointer"
                    onClick={() => setShare(!share)}
                >
                    <Menu>
                        {({ open }) => (
                            <>
                                <Menu.Button>
                                    <div
                                        data-tip
                                        data-for="dtechtive-share-btn-tooltip"
                                        className={` text-dtech-main-light px-2 pt-2 pb-2 mb-[-10px]  ${shareColor}`}
                                        onMouseDown={() =>
                                            setShareClicked(true)
                                        }
                                        onMouseUp={() => setShareClicked(false)}
                                        onMouseLeave={() =>
                                            setShareClicked(false)
                                        }
                                    >
                                        <BsShareFill
                                            className={`sm:h-6 sm:w-6 h-4 w-4  cursor-pointer ${
                                                (cardClicked || cardHover) &&
                                                " !text-dtech-dark-teal"
                                            }`}
                                            data-modal-toggle="popup"
                                            onClick={() => setShare(!share)}
                                        />
                                    </div>
                                    <ReactTooltip
                                        id="dtechtive-share-btn-tooltip"
                                        textColor={"white"}
                                        backgroundColor="#4CA7A5"
                                    >
                                        Share on social media
                                    </ReactTooltip>
                                </Menu.Button>
                                <Transition show={share}>
                                    <Menu.Items static className="">
                                        {
                                            <div
                                                onClick={handleClosePopup}
                                                className={
                                                    share
                                                        ? ` bg-black fixed opacity-50 h-[3000px] top-0 left-0 right-0 bottom-0 sm:h-[3000px] w-screen flex items-center  z-10`
                                                        : ""
                                                }
                                            ></div>
                                        }
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
                    <div className="text-[#727272] mt-2 text-base font-roboto">
                        Share
                    </div>
                </div>
                <div className=" cursor-pointer  hover:bg-[#6DCDCB] hover:bg-opacity-[55%] hover:rounded-md">
                    {router.pathname == "/datasets/[id]" && (
                        <Cite
                            citation={cite}
                            url={`${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${router.asPath}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default NewResultCardAction;
