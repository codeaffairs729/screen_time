import DefaultLayout from "components/layouts/default";
import Image from "next/image";
// import firstImage from "public/images/about-us/about_first.png";
// import secondImage from "public/images/about-us/tela.png";
// import thirdImage from "public/images/about-us/base.png";
// import fourthImage from "public/images/about-us/ScottishGovernment_Logo.png";
// import fifthImage from "public/images/about-us/NatureScot_Logo.png";
// import sixthImage from "public/images/about-us/image 36.png";
// import seventhImage from "public/images/about-us/image 37.png";
// import eightImage from "public/images/about-us/image 38.png";
// import ninthImage from "public/images/about-us/image 39.png";
// import tenthImage from "public/images/about-us/image 40.png";
// import userJourneyImage from "public/images/about-us/user_journey.png";
// import eleventhImage from "public/images/about-us/Sussex_University_Logo.png";
import YoutubePlayer from "components/about/youtube";
import HelpCard from "components/about/helpCard";
// import imageOneOfCard from "public/images/about-us/first_image.png";
// import imageTwoOfCard from "public/images/about-us/second_image.png";
// import imageThreeOfCard from "public/images/about-us/third_image.png";
// import imageFourthOfCard from "public/images/about-us/fourth_image.png";
// import imageFifthOfCard from "public/images/about-us/fifth_image.png";
// import imageSixthOfCard from "public/images/about-us/sixth_image.png";
import { useState } from "react";
import { BsChevronDown, BsCheck } from "react-icons/bs";

const dummyData = {
    name: "XYZ",
    title: "developer",
    desc: "Amazing",
    img: '/images/about-us/NatureScot_Logo.png',
};
const cardData = [
    {
        imageOne: '/images/about-us/first_image.png',
        imageTwo: '/images/about-us/second_image.png',
        cardData: {
            title: "Data Users",
            shortDesc:
                "Spend less time searching for datasets and more time deriving value from them.",
            desc: [
                "Discover datasets hidden deep in the web",
                "Search using simple terms and find relevant datasets",
                "Preview and download data files",
                "Get recommendations on datasets of interest",
                "Save datasets and share with others",
                "Get notifications on dataset updates",
                "Give feedback to data providers",
                "Gather data provider, topic and regional level insights",
            ],
        },
        cardUrl: "dtechtive.com",
        cardUrlLabel: "Try Dtechtive",
    },
    {
        imageOne: '/images/about-us/third_image.png',
        imageTwo: '/images/about-us/fourth_image.png',
        cardData: {
            title: "Data Providers",
            shortDesc:
                "Generate interest in datasets, improve dataset quality, understand user needs better and gain competitive advantage.",
            desc: [
                "Make datasets more discoverable",
                "Promote datasets and increase userbase",
                "Gather insights on metadata and data file quality",
                "Gather insights on dataset usage and engagement",
                "Generate reports on dataset quality and usage insights",
            ],
        },
        cardUrl: "https://dtime.ai/meeting",
        cardUrlLabel: "Schedule a meeting for early access",
    },
    {
        imageOne: "/images/about-us/fifth_image.png",
        imageTwo: "/images/about-us/sixth_image.png",
        cardData: {
            title: "Data Enablers",
            shortDesc:
                "Improve your organisation’s data discovery capability, foster data-informed decision making, enhance data-driven strategy and drive growth.",
            desc: [
                "Help employees discover open, commercial and internal datasets from a single portal",
                "Manage internal dataset access permissions",
                "Gather insights on internal dataset quality to improve downstream efficiencies",
                "Gather insights on how employees and other stakeholders engage with internal datasets within and across departments",
            ],
        },
        cardUrl: "https://dtime.ai/meeting",
        cardUrlLabel: "Schedule a meeting for early access",
    },
];
const dummyArray = Array(5).fill(dummyData);
const AboutUsPage = () => {
    return (
        <DefaultLayout>
            <div className="flex flex-col">
                <div className="text-3xl	 ml-4 font-bold mt-6 text-dtech-main-dark w-8/9 sm:text-5xl sm:w-2/3 sm:ml-28">
                    Dtechtive discovers the datasets other search engines cannot
                    reach,
                </div>
                <div className="text-2xl  ml-4 font-sans mt-6 text-dtech-main-dark w-8/9 sm:w-2/3 sm:ml-28">
                    by connecting Data Users and Data Providers in a unique
                    ecosystem
                </div>
                <div className="flex mt-20 flex-col sm:ml-24  sm:flex-row">
                    <div>
                        <Image src={'/images/about-us/about_first.png'} height={500} width={837} />
                    </div>
                    <div className="flex flex-col items-center sm:-mt-10">
                        <div className=" w-[100%] max-w-[640px] relative">
                            <div className="w-[90%] ml-[4.5%]">
                                <Image
                                    src={'/images/about-us/tela.png'}
                                    height={543}
                                    width={756}
                                />
                            </div>
                            <div className="h-[100%]  absolute top-0 left-0 w-full  flex justify-left items-center">
                                <YoutubePlayer
                                    videoId="aM3-4QvjVBk"
                                    className=" h-[87%] w-[86%] m-[6.5%] max-h-100%"
                                    iframeclassName="h-[100%] w-[100%]"
                                />
                            </div>
                        </div>

                        <div className=" -mt-5">
                            <Image src={'/images/about-us/base.png'} height={17} width={900} />
                        </div>
                    </div>
                </div>
                {/* <div>
                    <div className="text-dtech-main-dark text-2xl  ml-4 font-sans font-bold">
                        Our Customers
                    </div>
                    <div className="shadow !w-[100%] border-2 my-5 px-5"></div>
                    <div className="flex flex-col items-center">
                        <div className=" shadow-lg !w-[100%] border-2 my-5 rounded-lg flex flex-col md:flex-row">
                            <div className=" mx-[10%] my-[4%]">
                                <Image
                                    src={fourthImage}
                                    height={80}
                                    width={500}
                                />
                            </div>
                            <div className=" mx-[10%] my-[4%]">
                                <Image
                                    src={fifthImage}
                                    height={150}
                                    width={225}
                                />
                            </div>
                        </div>
                        <div className="text-dtech-main-dark m-8 text-2xl text-center w-[60%]">
                            Take a moment to read through our customer
                            testimonials and discover what makes Dtechtive stand
                            out from the rest.
                        </div>
                        <div className="flex flex-col md:flex-row">
                            {dummyArray.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className=" shadow-md w-[280px] h-[420px] mx-1 my-2 text-center bg-[#DBCFE2] border-2 rounded-sm flex flex-col"
                                    >
                                        <div className="  my-6">
                                            <Image
                                                src={item.img}
                                                height={120}
                                                width={120}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="text-dtech-main-dark text-2xl mt-4">
                                            {item.name}
                                        </div>
                                        <div className="text-dtech-main-dark text-1xl">
                                            {item.title}
                                        </div>
                                        <div className="text-dtech-main-dark text-1xl mt-20">
                                            {item.desc}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div> */}
                <div>
                    <div className="text-dtech-main-dark text-2xl  ml-4 font-sans font-bold">
                        Helping data users, providers and enablers
                    </div>
                    <div className="shadow !w-[100%] border-2 my-5 px-5"></div>
                    <div className="flex flex-col">
                        {cardData.map((item, index) => (
                            <HelpCard
                                key={index}
                                cardNumber={index}
                                imageOne={item.imageOne}
                                imageTwo={item.imageTwo}
                                title={item.cardData.title}
                                shortDesc={item.cardData.shortDesc}
                                desc={item.cardData.desc}
                                cardUrl={item.cardUrl}
                                cardUrlLabel={item.cardUrlLabel}
                            />
                        ))}
                    </div>
                </div>
                <div className="text-dtech-main-dark text-2xl  ml-4 font-sans font-bold">
                    User Journey Explained
                </div>
                <div className="shadow !w-[100%] border-2 my-5 px-5"></div>
                <div className="flex mt-20 flex-col sm:ml-24  sm:flex-row">
                    <div className=" mx-10">
                        <Image
                            src={'/images/about-us/user_journey.png'}
                            height={500}
                            width={437}
                        />
                    </div>
                    <div className="flex flex-col items-center md:mx-32 sm:-mt-10">
                        <div className=" w-[100%] max-w-[640px] relative">
                            <div className="w-[90%] ml-[4.5%]">
                                <Image
                                    src={'/images/about-us/tela.png'}
                                    height={493}
                                    width={656}
                                />
                            </div>
                            <div className="h-[100%]  absolute top-0 left-0 w-full  flex justify-left items-center">
                                <YoutubePlayer
                                    videoId="aM3-4QvjVBk"
                                    className=" h-[87%] w-[86%] m-[6.5%] max-h-100%"
                                    iframeclassName="h-[100%] w-[100%]"
                                />
                            </div>
                        </div>

                        <div className=" -mt-5">
                            <Image src={'/images/about-us/base.png'} height={17} width={750} />
                        </div>
                    </div>
                </div>
                <div className="text-dtech-main-dark text-2xl  ml-4 font-sans font-bold">
                    Our Partners
                </div>
                <div className="shadow !w-[100%] border-2 my-5 px-5"></div>
                <div className=" flex flex-col border-2 shadow-2xl rounded-xl">
                    <div className="flex flex-col md:flex-row">
                        <div className="mx-20 m-10 md:mx-40">
                            <Image src={'/images/about-us/image 36.png'} height={120} width={250} />
                        </div>
                        <div className="mx-20 m-10 md:mx-40">
                            <Image src={'/images/about-us/image 38.png'} height={70} width={240} />
                        </div>
                        <div className="mx-20 m-10 md:mx-40">
                            <Image src={'/images/about-us/image 40.png'} height={40} width={200} />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="mx-20 m-10 md:mx-40">
                            <Image
                                src={'/images/about-us/image 37.png'}
                                height={150}
                                width={200}
                            />
                        </div>
                        <div className="mx-20 m-10 md:mx-40">
                            <Image src={'/images/about-us/image 39.png'} height={100} width={350} />
                        </div>
                        <div className="mx-20 m-10 md:mx-40">
                            <Image
                                src={'/images/about-us/Sussex_University_Logo.png'}
                                height={90}
                                width={200}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:contents">
                <div className="text-dtech-main-dark text-2xl  ml-4  m-8 font-sans font-bold">
                    Subscription Plans
                </div>
                <div className="shadow !w-[100%] border-2 my-5 px-5"></div>
                <div className="flex flex-row rounded-lg md:mx-4 ">
                    <div className="flex flex-col text-lg font-bold rounded-2xl w-[19%] m-1 break-words">
                        {[
                            "Features",
                            "Search & navigation features (7)",
                            "Dataset View Page (10)",
                            "Data provider, topic & region view page (6)",
                            "My workspace page (5)",
                            "My accounts page (2)",
                            "General (3)",
                        ].map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex justify-center items-center p-2 ${
                                        index == 0
                                            ? " text-center h-60 pb-24 border-4 border-grey rounded-lg"
                                            : index ==
                                              [
                                                  "Features",
                                                  "Search & navigation features (7)",
                                                  "Dataset View Page (10)",
                                                  "Data provider, topic & region view page (6)",
                                                  "My workspace page (5)",
                                                  "My accounts page (2)",
                                                  "General (3)",
                                              ].length -
                                                  1
                                            ? "rounded-lg text-center border-grey border-4 justify-between"
                                            : "h-20 text-center  border-4 border-grey justify-between"
                                    }`}
                                >
                                    <div> {value}</div>
                                    <div>
                                        {index != 0 && (
                                            <BsChevronDown className=" items-end " />
                                        )}{" "}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex bg-[#E4C3F9] text-lg font-bold rounded-lg flex-col w-[20%] m-1">
                        {[
                            "Guest(free)",
                            "3/7",
                            "2/10",
                            "1/6",
                            "_",
                            "_",
                            "_",
                        ].map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex justify-center items-center p-1 ${
                                        index == 0
                                            ? " text-center h-60 pb-24 "
                                            : index ==
                                              [
                                                  "Guest(free)",
                                                  "3/7",
                                                  "2/10",
                                                  "1/6",
                                                  "_",
                                                  "_",
                                                  "_",
                                              ].length -
                                                  1
                                            ? "rounded text-center"
                                            : "flex flex-col h-20 text-center  border-y-4 border-white"
                                    }`}
                                >
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex bg-[#E3B7FF] text-lg font-bold rounded-lg flex-col m-1 w-[20%]">
                        {[
                            "Essential (Registered free)",
                            <BsCheck key={"bscheck1"} size={40} />,
                            <BsCheck key={"bscheck2"} size={40} />,
                            "1/6",
                            "4/5",
                            <BsCheck key={"bscheck3"} size={40} />,
                            ,
                            "2/3",
                        ].map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex justify-center items-center text-center p-2 ${
                                        index == 0
                                            ? " h-60 pb-24 "
                                            : index ==
                                              [
                                                  "Essential (Registered free)",
                                                  <BsCheck key={"bscheck4"} className=" items-center" />,
                                                  <BsCheck
                                                      key={"bscheck5"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  "1/6",
                                                  "4/5",
                                                  <BsCheck
                                                      key={"bscheck6"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  "2/3",
                                              ].length -
                                                  1
                                            ? "rounded text-center"
                                            : "flex flex-col p-3 h-20 border-y-4 border-white"
                                    }`}
                                >
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex  bg-[#D396FA] text-lg font-bold rounded-lg flex-col m-1 w-[20%]">
                        {[
                            "Professional(paid) £15/user/month Discounted bundles available for organisations",
                            <BsCheck key={"bscheck7"} size={40} />,
                            ,
                            <BsCheck key={"bscheck8"} size={40} />,
                            ,
                            "5/6",
                            "4/5",
                            <BsCheck key={"bscheck9"} size={40} />,
                            ,
                            <BsCheck key={"bscheck10"} size={40} />,
                            ,
                        ].map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex justify-center items-center p-2 ${
                                        index == 0
                                            ? " text-center h-60 pb-24 "
                                            : index ==
                                              [
                                                  "Professional(paid)",
                                                  <BsCheck
                                                      key={"bscheck11"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  <BsCheck
                                                      key={"bscheck12"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  "5/6",
                                                  "4/5",
                                                  <BsCheck
                                                      key={"bscheck13"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  <BsCheck
                                                      key={"bscheck14"}
                                                      size={40}
                                                  />,
                                                  ,
                                              ].length -
                                                  1
                                            ? "rounded text-center"
                                            : "flex flex-col p-3 h-20 text-left  border-y-4 border-white"
                                    }`}
                                >
                                    <div className="flex flex-col">
                                        <div>{value}</div>
                                        {index == 0 && (
                                            <div>
                                                <button className="  bg-white rounded-full text-black p-2">
                                                    Upgrade
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex bg-[#B46DE2] text-lg font-bold flex-col text-white rounded-2xl m-1 w-[20%]">
                        {[
                            `Premium (paid) £20/user/month
                            Discounted bundles available for organisations`,
                            <BsCheck key={"bscheck15"} size={40} />,
                            ,
                            <BsCheck key={"bscheck16"} size={40} />,
                            ,
                            <BsCheck key={"bscheck17"} size={40} />,
                            ,
                            <BsCheck key={"bscheck18"} size={40} />,
                            ,
                            <BsCheck key={"bscheck19"} size={40} />,
                            ,
                            <BsCheck key={"bscheck20"} size={40} />,
                            ,
                        ].map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex justify-center items-center p-2 ${
                                        index == 0
                                            ? " text-center h-60 pb-24 "
                                            : index ==
                                              [
                                                  "Premium (paid)",
                                                  <BsCheck
                                                      key={"bscheck21"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  <BsCheck
                                                      key={"bscheck22"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  <BsCheck
                                                      key={"bscheck23"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  <BsCheck
                                                      key={"bscheck24"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  <BsCheck
                                                      key={"bscheck25"}
                                                      size={40}
                                                  />,
                                                  ,
                                                  <BsCheck
                                                      key={"bscheck26"}
                                                      size={40}
                                                  />,
                                                  ,
                                              ].length -
                                                  1
                                            ? "rounded text-center "
                                            : " p-3 h-20 text-left  border-y-4 border-white"
                                    }`}
                                >
                                    <div className="flex flex-col">
                                        <div>{value}</div>
                                        {index == 0 && (
                                            <div>
                                                <button className="  bg-white rounded-full text-black p-2">
                                                    Upgrade
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-row justify-evenly mx-4 text-lg">
                    <div className=" px-9 py-4 bg-[#EAE3EE] rounded-xl">
                        Add-Ons (paid)
                        <div>
                            <a href="https://dtime.ai/meeting">
                                <button className="  bg-white rounded-full text-black p-2">
                                    Upgrade
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="bg-[#EAE3EE] px-9 py-4">
                        Dataset promotion
                    </div>
                    <div className="bg-[#EAE3EE] px-9 py-4">
                        Data source priority indexing
                    </div>
                    <div className="bg-[#EAE3EE] px-9 py-4">Whitelabelling</div>
                    <div className="bg-[#EAE3EE] px-9 py-4">
                        Internal search
                    </div>
                    <div className="bg-[#EAE3EE] px-9 py-4 rounded-xl">
                        3rd party integration
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
export default AboutUsPage;
