import { AiOutlineClose } from "react-icons/ai";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
type PopupProps = {
    href: String;
    dataset: String;
    onClose?: () => void;
};
const Popup = ({ href, dataset, onClose }: PopupProps) => {
    const Message = `Checkout the datasets from ${dataset} listed on Dtechtive`;
    const LinkedinURL = `http://www.linkedin.com/shareArticle?mini=true&url=`;
    const TwitterURL = `https://twitter.com/intent/tweet?url=`;
    const FacebookURL = `https://www.facebook.com/sharer.php?display=page&u=`;
    return (
        <div
            id="popup"
            className="z-10 absolute flex flex-col border-4  right-7 border-[#6DCDCB] bg-white text-sm  py-2 h-28 w-48   my-2 ml-[-75px] mr-4 rounded-lg "
        >
            <div>
                <AiOutlineClose
                    className="w-4 h-4 float-right mx-3 cursor-pointer z-20"
                    strokeWidth={"1"}
                    onClick={onClose}
                />
            </div>
            <div className="mb-1">
                <span className=" mx-2 font-normal ">Share</span>
            </div>
            <div className="border border-t-[1px] mx-2 border-gray-200"></div>
            <div className="flex flex-row justify-evenly items-center my-2">
                <a
                    href={`${LinkedinURL}${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${href}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <BsLinkedin className="h-6 w-8 ml-2 my-2 cursor-pointer" />
                </a>
                <a
                    href={`${TwitterURL}${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${href}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <BsTwitter className="h-6 w-8 ml-1 my-2 cursor-pointer" />
                </a>
                <a
                    href={`${FacebookURL}${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${href}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <BsFacebook className="h-6 w-8 ml-1 my-2 cursor-pointer" />
                </a>
            </div>
        </div>
    );
};

export default Popup;
