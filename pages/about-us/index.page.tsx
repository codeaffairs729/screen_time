import DefaultLayout from "components/layouts/default";
import Image from "next/image";
import dynamic from 'next/dynamic'

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
const Accordion = dynamic(()=>import("components/about/accordion"),{
    ssr:false
})

const accordionData = [
    {
        feature: "Features",
        guest: "Guest (free)",
        essential: "Essential (Registered free)",
        professional: "Professional (paid)",
        premium: "Premium (paid)",
    },
    {
        feature: "Search & navigation features (7)",
        guest: "3/7",
        essential: "5/6",
        professional: "5/6",
        premium: "5/6",
        children: [
            {
                feature: "Search datasets, data providers, topics & regions",
                guest: true,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Filter & sort search results",
                guest: true,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature:
                    "Add datasets, data providers, topics & regions to favourites",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature:
                    "Create dataset, data provider. topics & regions lists",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature:
                    "Share datasets, data providers, topics & regions on social media",
                guest: true,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Buy data",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Search API access",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
        ].map((item, index) => (
            <Accordion
                feature={item.feature}
                guest={item.guest}
                essential={item.essential}
                premium={item.premium}
                professional={item.professional}
                key={index}
                index={index}
            />
        )),
    },
    {
        feature: "Dataset View Page (10)",
        guest: "2/10",
        essential: "5/6",
        professional: "5/6",
        premium: "5/6",
        children: [
            {
                feature: "View Data Files",
                guest: true,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Download individual data files",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Download multiple data files",
                guest: false,
                essential: false,
                professional: true,
                premium: true,
            },
            {
                feature: "Preview data files",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View Metadata Quality scores",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View Data Quality scores",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View Use Cases summary",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View Download metrics",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Give User Feedback",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: " See Related Datasets",
                guest: true,
                essential: true,
                professional: true,
                premium: true,
            },
        ].map((item, index) => (
            <Accordion
                feature={item.feature}
                guest={item.guest}
                essential={item.essential}
                premium={item.premium}
                professional={item.professional}
                key={index}
                index={index}
            />
        )),
    },
    {
        feature: "Data provider, topic & region view page (6)",
        guest: "1/6",
        essential: "5/6",
        professional: "5/6",
        premium: "5/6",
        children: [
            {
                feature: "View Datasets aggregated",
                guest: true,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View Metadata Quality Scores aggregated",
                guest: false,
                essential: false,
                professional: true,
                premium: true,
            },
            {
                feature: "View Data Quality Scores aggregated",
                guest: false,
                essential: false,
                professional: true,
                premium: true,
            },
            {
                feature: "View Search Terms aggregated",
                guest: false,
                essential: false,
                professional: true,
                premium: true,
            },
            {
                feature: "View Download Metrics aggregated",
                guest: false,
                essential: false,
                professional: true,
                premium: true,
            },
            {
                feature: "Generate dataset insights report",
                guest: false,
                essential: false,
                professional: false,
                premium: true,
            },
        ].map((item, index) => (
            <Accordion
                feature={item.feature}
                guest={item.guest}
                essential={item.essential}
                premium={item.premium}
                professional={item.professional}
                key={index}
                index={index}
            />
        )),
    },
    {
        feature: "My workspace page (5)",
        guest: "_",
        essential: "5/6",
        professional: "5/6",
        premium: "5/6",
        children: [
            {
                feature: "Upload, manage & publish own datasets",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View & manage Lists",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View & manage History",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View & manage Notifications",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "View User Feedback & Respond",
                guest: false,
                essential: false,
                professional: false,
                premium: true,
            },
        ].map((item, index) => (
            <Accordion
                feature={item.feature}
                guest={item.guest}
                essential={item.essential}
                premium={item.premium}
                professional={item.professional}
                key={index}
                index={index}
            />
        )),
    },
    {
        feature: "My accounts page (2)",
        guest: "_",
        essential: "5/6",
        professional: "5/6",
        premium: "5/6",
        children: [
            {
                feature: "Manage profile",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Manage subscriptions & payments",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
        ].map((item, index) => (
            <Accordion
                feature={item.feature}
                guest={item.guest}
                essential={item.essential}
                premium={item.premium}
                professional={item.professional}
                key={index}
                index={index}
            />
        )),
    },
    {
        feature: "General (3)",
        guest: "_",
        essential: "5/6",
        professional: "5/6",
        premium: "5/6",
        children: [
            {
                feature: "Data source registration",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Sell data",
                guest: false,
                essential: true,
                professional: true,
                premium: true,
            },
            {
                feature: "Support",
                guest: false,
                essential: false,
                professional: true,
                premium: true,
            },
        ].map((item, index) => (
            <Accordion
                feature={item.feature}
                guest={item.guest}
                essential={item.essential}
                premium={item.premium}
                professional={item.professional}
                key={index}
                index={index}
            />
        )),
    },
];

const dummyData = {
    name: "XYZ",
    title: "developer",
    desc: "Amazing",
    img: "/images/about-us/NatureScot_Logo.webp",
};
const cardData = [
    {
        imageOne: "/images/about-us/first_image.webp",
        imageTwo: "/images/about-us/second_image.webp",
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
        cardUrl: "https://dtechtive.com/",
        cardUrlLabel: "Try Dtechtive",
    },
    {
        imageOne: "/images/about-us/third_image.webp",
        imageTwo: "/images/about-us/fourth_image.webp",
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
        imageOne: "/images/about-us/fifth_image.webp",
        imageTwo: "/images/about-us/sixth_image.webp",
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
                <div className="text-3 ml-4 font-bold mt-6 text-dtech-main-dark w-8/9 sm:text-5xl sm:w-2/3 sm:ml-28">
                    Dtechtive discovers the datasets other search engines cannot
                    reach,
                </div>
                <div className="text-2xl  ml-4 font-sans mt-6 text-dtech-main-dark w-8/9 sm:w-2/3 sm:ml-28">
                    by connecting Data Users and Data Providers in a unique
                    ecosystem
                </div>
                <div className="flex mt-20 flex-col sm:ml-24 mb-20 sm:flex-row">
                    <div>
                        <Image
                            src={"/images/about-us/about_first.webp"}
                            alt={"loading"}
                            height={500}
                            width={837}
                        />
                    </div>
                    <div className="flex flex-col items-center sm:-mt-10">
                        <div className=" w-[100%] max-w-[640px] relative">
                            <div className="w-[90%] ml-[4.5%]">
                                <Image
                                    src={"/images/about-us/tela.webp"}
                                    alt={"loading"}
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
                            <Image
                                src={"/images/about-us/base.webp"}
                                alt={"loading"}
                                height={17}
                                width={900}
                            />
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
                <div className="mb-20">
                    <div className="text-dtech-main-dark text-2xl  ml-4 font-sans font-bold">
                        Helping data users, providers and enablers
                    </div>
                    <div className="shadow !w-[100%] border-2   my-5 px-5"></div>
                    <div className="flex flex-col mx-4 md:mx-12 w-11/12">
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
                <div className="flex mt-20 flex-col sm:ml-24  mb-10 sm:flex-row">
                    <div className=" mx-10">
                        <Image
                            src={"/images/about-us/user_journey.webp"}
                            alt={"loading"}
                            height={500}
                            width={437}
                        />
                    </div>
                    <div className="flex flex-col items-center md:mx-32 sm:-mt-10 ">
                        <div className=" w-[100%] max-w-[640px] relative">
                            <div className="w-[90%] ml-[4.5%]">
                                <Image
                                    src={"/images/about-us/tela.webp"}
                                    alt={"loading"}
                                    height={493}
                                    width={656}
                                />
                            </div>
                            <div className="h-[100%]  absolute top-0 left-0 w-full  flex justify-left items-center">
                                <YoutubePlayer
                                    videoId="L34Lg7bDT1E"
                                    className=" h-[87%] w-[86%] m-[6.5%] max-h-100%"
                                    iframeclassName="h-[100%] w-[100%]"
                                />
                            </div>
                        </div>

                        <div className=" -mt-5">
                            <Image
                                src={"/images/about-us/base.webp"}
                                alt={"loading"}
                                height={17}
                                width={750}
                            />
                        </div>
                    </div>
                </div>
                <div className="contents  sm:contents ">
                    <div className="text-dtech-main-dark text-2xl   ml-4  mt-8 font-sans font-bold">
                        Subscription Plans
                    </div>
                    <div className="shadow !w-[100%] border-2 my-5 px-5"></div>

                    <div className=" m-1">
                        {accordionData.map((item, index) => (
                            <Accordion
                                feature={item.feature}
                                guest={item.guest}
                                essential={item.essential}
                                premium={item.premium}
                                professional={item.professional}
                                key={index}
                                index={index}
                            >
                                {item.children}
                            </Accordion>
                        ))}
                        <div className="flex flex-col mb-20 justify-evenly my-2 text-lg md:flex-row">
                            <div className=" px-7 w-[98%] md:w-[20%] mx-1 py-4 bg-[#EAE3EE] rounded-l-xl">
                                Add-Ons (paid)
                                <div>
                                    <a href="https://dtime.ai/meeting">
                                        <button className="  bg-white rounded-full text-black p-2">
                                            Contact Us
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-[#EAE3EE] mx-1 px-9 py-4">
                                Dataset promotion
                            </div>
                            <div className="bg-[#EAE3EE] mx-1 px-9 py-4">
                                Data source priority indexing
                            </div>
                            <div className="bg-[#EAE3EE] px-9 mx-1 py-4">
                                Whitelabelling
                            </div>
                            <div className="bg-[#EAE3EE] px-9 mx-1 py-4">
                                Internal search
                            </div>
                            <div className="bg-[#EAE3EE] px-9 py-4 mx-1 rounded-r-xl">
                                3rd party integration
                            </div>
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
                            <Image
                                src={"/images/about-us/image 36.webp"}
                                alt={"loading"}
                                height={120}
                                width={250}
                            />
                        </div>
                        <div className="mx-20 m-10 md:mx-40">
                            <Image
                                src={"/images/about-us/image 38.webp"}
                                alt={"loading"}
                                height={70}
                                width={240}
                            />
                        </div>
                        <div className="mx-20 m-10 md:mx-40">
                            <Image
                                src={"/images/about-us/image 40.webp"}
                                alt={"loading"}
                                height={40}
                                width={200}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="mx-20 m-10 md:mx-40">
                            <Image
                                src={"/images/about-us/image 37.webp"}
                                alt={"loading"}
                                height={150}
                                width={200}
                            />
                        </div>
                        <div className="mx-20 m-10 md:mx-40">
                            <Image
                                src={"/images/about-us/image 39.webp"}
                                alt={"loading"}
                                height={100}
                                width={350}
                            />
                        </div>
                        <div className="mx-20 m-10 md:mx-40">
                            <Image
                                src={
                                    "/images/about-us/Sussex_University_Logo.webp"
                                }
                                alt={"loading"}
                                height={90}
                                width={200}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
export default AboutUsPage;
