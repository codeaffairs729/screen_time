import Link from "next/link";
import { BiPound } from "react-icons/bi";

const AddOns = ({ disableContact = false }: { disableContact?: boolean }) => {
    const addOns = [
        {
            title: "Priority dataset acquisition",
            question: "Unable to find datasets of your interest on Dtechtive?",
            answer: "Don’t worry, we can discover and make them available for you on priority.",
            url: "",
            imgPath: "/images/icons/database_filled.svg",
        },
        {
            title: "Whitelabelling",
            question:
                "Would you like to have a dataset search engine with your branding? ",
            answer: "We can white label Dtechtive for you just as we created find.data.gov.scot for the Scottish Government.",
            url: "",
            imgPath: "/images/icons/database_filled.svg",
        },
        {
            title: "Internal search",
            question:
                "Are you struggling with internal search within your organisation?",
            answer: "We can utilise Dtechtive to make your internal files more discoverable.",
            url: "",
            imgPath: "/images/icons/database_filled.svg",
        },
    ];
    return (
        <>
            {!disableContact ? (
                <div className="mx-1 text-base">
                    <div className=" font-bold">
                        To get any of the below add-ons, get in touch{" "}
                    </div>
                    {addOns?.map((item, index) => (
                        <div key={index}>
                            <div className="  my-4">
                                <div className="font-bold text-base">
                                    <span>{item.title}</span>
                                </div>
                                <div className="my-2">
                                    <div className=" text-[#727272]">
                                        <span>{item.question}</span>
                                    </div>
                                    <div className=" text-[#727272]">
                                        <span>{item.answer}</span>
                                    </div>
                                    {/* <div className=" text-[#4CA7A5]">
                                        <Link href={""}>
                                            <span className="flex items-center">
                                                <BiPound className="" />
                                                /website
                                            </span>
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div>
                        <div className="flex justify-center items-center">
                            <button
                                className=" flex justify-center items-center bg-dtech-new-main-light m-4 p-4 w-[127px] h-[40px] rounded-full mx-2 cursor-pointer"
                                onClick={() => {}}
                            >
                                <span className="text-white">Contact Us</span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center w-full my-5">
                    <div className="">
                        <div className="flex justify-end items-center font-bold mr-2">
                            <span className="">
                                To learn more about the following add-ons,
                                <br /> email us at
                                <span className=" underline underline-offset-2 mx-1">
                                    dtechtive@dtime.ai
                                </span>
                                or arrange a call via{" "}
                                <Link href="https://dtime.ai/meeting" passHref>
                                    <a
                                        className="underline underline-offset-2"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        dtime.ai/meeting
                                    </a>
                                </Link>
                            </span>
                        </div>
                        {addOns?.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-row justify-between items-center"
                            >
                                <div className="mx-2">
                                    <img
                                        src={item.imgPath}
                                        alt={`add${index}`}
                                        width={30}
                                        height={30}
                                    />
                                </div>
                                <div className="w-[532px]  my-4">
                                    <div className="font-bold text-base">
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="my-2">
                                        <div className=" text-[#727272]">
                                            <span>{item.question}</span>
                                        </div>
                                        <div className=" text-[#727272]">
                                            <span>{item.answer}</span>
                                        </div>
                                        {/* <div className=" text-[#4CA7A5] ">
                                            <Link href={""}>
                                                <span className="flex items-center font-semibold">
                                                    <BiPound className="" />
                                                    /website
                                                </span>
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default AddOns;
