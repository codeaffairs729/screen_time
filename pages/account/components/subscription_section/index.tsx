import Dropdown from "components/UI/drop_down";
import Image from "next/image";
import tick from "public/images/icons/tick.svg";
import { FC, useState } from "react";
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
        <div>
            Work in Progress 
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
        </div>
    );
};
export default SubscriptionSection;

const Description = ({ label }: { label: string }): JSX.Element => {
    return (
        <div className="my-2 ml-5 flex flex-row items-center">
            <div className="select-none outline-none  w-2 h-2 bg-black rounded-full"></div>
            <span className="ml-3 ">{label}</span>
        </div>
    );
};
