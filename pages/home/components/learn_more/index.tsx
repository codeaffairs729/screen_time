import { useState } from "react";
import HelpComponent from "../help_component";
import HowItWorks from "../how_it_works";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import clsx from "clsx";


const helpData = [{
    img: "/images/helping_data_users.svg",
    label: "DATA USERS",
    title: "Spend less of your time searching for datasets and more time using them.",
    summary: [
        "Discover datasets hidden deep in the web",
        "Search using simple terms and find relevant datasets",
        "Preview and download data files",
        "Get recommendations on datasets of interest",
        "Save datasets and share with others",
        "Get notifications on dataset updates",
        "Give feedback to data providers",
        "Gather data provider, topic and regional level insights",

    ]
},
{
    img: "/images/helping_data_providers.svg",
    label: "DATA PROVIDER",
    title: "Promote your datasets, get guidance on enhancing dataset quality, learn how users use your datasets, and improve your understanding of user needs.",
    summary: [
        "Make datasets more discoverable",
        "Promote datasets and increase userbase",
        "Gather insights on metadata and data file quality",
        "Gather insights on dataset usage and engagement",
        "Generate reports on dataset quality and usage insights",
    ]
},
{
    img: "/images/helping_data_enablers.svg",
    label: "DATA ENABLERS",
    title: "Improve your organisation’s data discovery capability, foster data-informed decision making, enhance data-driven strategy and drive growth.",
    summary: [
        "Help employees discover open, commercial and internal datasets from a single portal",
        "Manage internal dataset access permissions",
        "Gather insights on internal dataset quality to improve downstream efficiencies",
        "Gather insights on how employees and other stakeholders engage with internal datasets within and across departments",
    ]
    }]

const LearnMore = ({ isMobile}:{ isMobile:boolean}) => {
    const [learnMore, setLearnMore] = useState<boolean>(false)

    return (
        <div>
            <div className={clsx(`w-full py-3 sm:py-16 md:text-3xl text-[19px] overflow-hidden cursor-pointer text-dtech-new-main-light font-bold   ${learnMore ? "!h-full" : "mb-0"} }`)}
                style={!isMobile ? { backgroundImage: `url(images/bghome.svg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }
                    :
                    { background: `linear-gradient(180deg, rgba(181, 133, 183, 0.53) -33.18%, rgba(109, 205, 203, 0.22) 46.47%, rgba(235, 246, 246, 0) 98.63%)` }}
            >
                <div className=" flex flex-col items-center"
                    onClick={() => {
                        // Use setTimeout to trigger the transition after a few milliseconds
                        setTimeout(() => {
                            setLearnMore(!learnMore);
                        }, 10);
                    }}
                >

                    <div>{!learnMore ? "Learn more" : "See less"}</div>
                    <div className=" w-fit shadow-custom-1 bg-dtech-new-main-light hover:bg-[#FDD522] hover:text-black sm:hover:text-white sm:hover:bg-dtech-main-dark hover:border-b-2 border-black sm:hover:border-0 text-white rounded-full p-2 mt-5 hover:rounded-full focus-within:rounded-full focus:rounded-full focus-visible:rounded-full active:rounded-full focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522] animate-bounce">{!learnMore ? <HiOutlineChevronDown size={40} className=" !text-white hover:!text-[#00437E] " /> : <HiOutlineChevronUp size={40} className="!text-white hover:!text-[#00437E] " />}</div>
                </div>
            </div>
            <div className={!learnMore ? "" : "h-full"}
                style={!isMobile ? { backgroundImage: `url(images/bghome.svg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } : {}}

            >
                <div className={!learnMore ? " hidden" : "block md:mb-20 mb-10"}>

                    <div className="flex flex-row px-6 sm:px-[10%] sm:items-center justify-between sm:justify-start">
                        <div className=" flex flex-row py-10">
                            <div className="font-[700] sm:text-xl text-md md:text-[30px] text-dtech-new-main-light md:text-[#333333]">Helping Data Users & Providers</div>
                        </div>
                    </div>
                    {helpData.map((item, index) => {
                        return (
                            item.label !== 'DATA ENABLERS' && <HelpComponent key={index} item={item} index={index} isMobile={isMobile} />
                        )
                    })}
                </div>
                {(isMobile || (!isMobile && learnMore)) && <HowItWorks isMobile={isMobile} learnMore={learnMore} />}
            </div>
        </div>
    )
}
export default LearnMore;