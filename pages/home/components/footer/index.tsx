import ContactUs from "./form/contact_us";
import LearnMore from "./learn_more/learn_more";
import Resources from "./resources/resources";
import Link from "next/link"
const Footer = () => {
    return (
        <div className="  bg-[#EBEBEB]" style={{
            // background: "linear-gradient(to bottom, #B585B770, #6DCDCB59)"
        }}>
            <div className=" sm:py-6 sm:px-[10%] ">
                <div className="flex flex-col sm:flex-row sm:px-[10%] px-6 max-w-full bg-white ">
                    <div className="flex flex-row sm:w-2/3 sm:px-2 sm:py-4 ">
                        <Resources />
                        <LearnMore />
                    </div>
                    <div className=" sm:px-2 sm:py-4 sm:w-1/3 ">
                        <ContactUs />
                    </div>
                </div>
            </div>
            <div className="flex flex-row bg-white items-center justify-center mt-1   p-2 sm:py-6 sm:px-[10%]">
                <Link href="/">
                    <img src="/images/dtechtive_without_tagline.png" width={100}></img>
                </Link>
                <div className=" bg-dtech-main-dark w-[2px] mx-4 h-16">
                </div>
                <div className="flex flex-col sm:text-sm text-xs text-dtech-main-grey">
                    <div className=" text-dtech-light-teal">Proudly brought to you by <a href="https://dtime.ai/home" rel="noreferrer" target="_blank"><span className=" font-bold text-dtech-new-main-light">DTIME.AI ©2023.</span></a>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Footer;