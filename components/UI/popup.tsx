import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
type PopupProps = {
    href: String;
};
const Popup = ({ href }: PopupProps) => {
    const LinkedinURL = "http://www.linkedin.com/shareArticle?mini=true&url=";
    const TwitterURL = "https://twitter.com/intent/tweet?text=";
    const FacebookURL = "https://www.facebook.com/sharer.php?display=page&u=";
    return (
        <div
            id="popup"
            className="z-10 absolute w-32 flex border border-1 border-dtech-light-grey bg-[#FCDCFB] text-sm px-1 h-14 p-2 my-2 ml-[-31px] mr-4 rounded-md"
        >
            <a
                href={`${LinkedinURL}${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${href}`}
            >
                <BsLinkedin className="h-6 w-8 ml-2 my-2 cursor-pointer" />
            </a>
            <a
                href={`${TwitterURL}${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${href}`}
            >
                <BsTwitter className="h-6 w-8 ml-1 my-2 cursor-pointer" />
            </a>
            <a
                href={`${FacebookURL}${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${href}`}
                target="_blank"
            >
                <BsFacebook className="h-6 w-8 ml-1 my-2 cursor-pointer" />
            </a>
        </div>
    );
};

export default Popup;
