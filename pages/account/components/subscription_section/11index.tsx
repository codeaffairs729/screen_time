import Dropdown from "components/UI/drop_down";
import Image from "next/image";
import tick from "public/images/icons/tick.svg";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
const Accordion = dynamic(() => import("components/about/accordion"), {
    ssr: false,
});

const accordionData = [
    {
        feature: "Features",
        guest: "Guest (free)",
        essential: "Essential (Free)",
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
                //guest={item.guest}
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
                //guest={item.guest}
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
                //guest={item.guest}
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
                //guest={item.guest}
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
                //guest={item.guest}
                essential={item.essential}
                premium={item.premium}
                professional={item.professional}
                key={index}
                index={index}
            />
        )),
    },
    
];
const dataSearchEnhancementList = [
    "Search query autocompletion",
    "Custom filters",
    "Sort results",
];
const PLANS = [
    {
        plan: "monthly",
    },
    {
        plan: "yearly",
    },
];
const reportingList = ["Search analytics", "Results analytics"];
const SubscriptionSection = () => {
    const [plan, setPlan] = useState("");
    const options = PLANS.map((obj) => ({
        label: `${obj.plan}`,
        onClick: () => {
            setPlan(obj.plan);
        },
    }));
    return (
        <div  >
            
            {/* <div className="w-[50%] py-6 mx-10 flex flex-col mt-12 ml-6 mb-96 border-2 shadow-lg rounded-[44px]">
                <div className="bg-dtech-main-light text-dtech-main-dark font-medium py-2 cursor-pointer w-full text-center">
                    Enterprise Global
                </div>
                <div className="flex flex-row justify-around text-xl">
                    <div className="flex flex-col  items-start my-4">
                        <span className="text-dtech-main-dark font-medium">
                            &#163;1k
                        </span>
                        <span>per month</span>
                    </div>
                    <div className="my-6    ">or</div>
                    <div className="flex flex-col  items-start my-4">
                        <span className="text-dtech-main-dark font-medium">
                            &#163;10k
                        </span>
                        <span>per month</span>
                    </div>
                </div>
                <div className=" ml-14 my-6">
                    <div className="my-2">
                        <Image src={tick} />
                        <span className="ml-2 font-medium">
                            Data search enhancement
                        </span>
                    </div>
                    {dataSearchEnhancementList?.map(
                        (label: string, index: number) => (
                            <Description label={label} key={index} />
                        )
                    )}
                    <div className="my-2">
                        <Image src={tick} />
                        <span className="ml-2 font-medium">
                            Navigation features
                        </span>
                    </div>
                    <div className="my-2">
                        <Image src={tick} />
                        <span className="ml-2 font-medium">Logs</span>
                    </div>
                    <div className="my-2">
                        <Image src={tick} />
                        <span className="ml-2 font-medium">Reporting</span>
                    </div>
                    {reportingList?.map((label: string, index: number) => (
                        <Description label={label} key={index} />
                    ))}
                    <div className="my-2">
                        <Image src={tick} />
                        <span className="ml-2 font-medium">
                            Customer support - 24 hours SLA
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-20">
                    <div className="flex flex-col">
                        <div>Plan</div>
                        <div className="w-20 border border-dtech-main-dark rounded ml- px-6">
                            <Dropdown
                                label={`${plan}`}
                                menuItems={options}
                                menuItemsClasses="!w-32 border border-dtech-main-dark"
                                labelClasses=" text-m font-normal pr-2.5 "
                                className="!ml-0 "
                                iconClass="text-dtech-main-dark"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>Queries</div>
                        <div className="w-20 border border-dtech-main-dark rounded ml- px-6">
                            <Dropdown
                                label={`${plan}`}
                                menuItems={options}
                                menuItemsClasses="!w-32 border border-dtech-main-dark"
                                labelClasses=" text-m font-normal pr-2.5 "
                                className="!ml-0 "
                                iconClass="text-dtech-main-dark"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-20">
                    <div className="flex flex-col">
                        <div>Users</div>
                        <div className="w-20 border border-dtech-main-dark rounded ml- px-6">
                            <Dropdown
                                label={`${plan}`}
                                menuItems={options}
                                menuItemsClasses="!w-32 border border-dtech-main-dark"
                                labelClasses=" text-m font-normal pr-2.5 "
                                className="!ml-0 "
                                iconClass="text-dtech-main-dark"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>Cloud integrations</div>
                        <div className="w-20 border border-dtech-main-dark rounded ml- px-6">
                            <Dropdown
                                label={`${plan}`}
                                menuItems={options}
                                menuItemsClasses="!w-32 border border-dtech-main-dark"
                                labelClasses=" text-m font-normal pr-2.5 "
                                className="!ml-0 "
                                iconClass="text-dtech-main-dark"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-20">
                    <div className="flex flex-col ">
                        <div>Admins</div>
                        <div className="w-20 border border-dtech-main-dark rounded ml- px-6">
                            <Dropdown
                                label={`${plan}`}
                                menuItems={options}
                                menuItemsClasses="!w-32 border border-dtech-main-dark"
                                labelClasses=" text-m font-normal pr-2.5 "
                                className="!ml-0 "
                                iconClass="text-dtech-main-dark"
                            />
                        </div>
                    </div>
                </div>
            </div> */}
            <div >
                {accordionData.map((item, index) => (
                    <Accordion
                        feature={item.feature}
                        //guest={item.guest}
                        essential={item.essential}
                        premium={item.premium}
                        professional={item.professional}
                        key={index}
                        index={index}
                    >
                        {item.children}
                    </Accordion>
                ))}
            </div>
        </div>
    );
};
export default SubscriptionSection;

const Description = ({ label }: { label: string }): JSX.Element => {
    return (
        <div className="my-2 ml-5 flex flex-row  items-center ">
            <div className="select-none outline-none  w-2 h-2 bg-black rounded-full"></div>
            <span className="ml-3 ">{label}</span>
        </div>
    );
};
