import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
type PopupProps = {
    href: String;
    dataset: String;
};
const Popup = ({ href, dataset }: PopupProps) => {
    const Message = `Checkout the datasets from ${dataset} listed on Dtechtive`;
    const LinkedinURL = `http://www.linkedin.com/shareArticle?mini=true&title=${Message}&url=`;
    const TwitterURL = `https://twitter.com/intent/tweet?text=${Message}&url=`;
    const FacebookURL = `https://www.facebook.com/sharer.php?display=page&u=`;
    return (
        <div
            id="popup"
            className="z-10 absolute w-32 flex border border-1 border-dtech-light-grey bg-[#FCDCFB] text-sm px-1 h-14 p-2 my-2 ml-[-75px] mr-4 rounded-md"
        >
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
                href={`${FacebookURL}${process.env.NEXT_PUBLIC_WEBCLIENT_ROOT}${href}&t=${Message}`}
                target="_blank"
                rel="noreferrer"
            >
                <BsFacebook className="h-6 w-8 ml-1 my-2 cursor-pointer" />
            </a>
        </div>
    );
};

export default Popup;
