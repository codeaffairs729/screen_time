import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
const Popup = () => {
    return (
        <div
            id="popup"
            className="z-10 absolute w-32 flex border border-1 border-dtech-light-grey bg-[#FCDCFB] text-sm px-1 h-14 p-2 my-2 ml-[-31px] mr-4 rounded-md"
        >
            <a href="">
                <BsLinkedin className="h-6 w-8 ml-2 my-2 cursor-pointer" />
            </a>
            <a href="">
                <BsTwitter className="h-6 w-8 ml-1 my-2 cursor-pointer" />
            </a>
            <a href="">
                <BsFacebook className="h-6 w-8 ml-1 my-2 cursor-pointer" />
            </a>
        </div>
    );
};

export default Popup;
