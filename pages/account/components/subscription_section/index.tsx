import AddOns from "./components/add_ons";
import SubscriptionDropdown from "./components/subscription_dropdown";
import ListHeader from "./components/list";
import Card from "./components/subscription_card";
import { useIsMobile } from "common/hooks";
const subscription = require("../subscription_section/subscription_plan_feature.json");

const SubscriptionSection = () => {
    const { isMobile } = useIsMobile();

    return (
        <>
            {!isMobile ? (
                <div className="flex flex-col">
                    <div className="flex">
                        {subscription.plans?.map((plan: any, index: number) => (
                            <Card
                                key={index}
                                cardOuterClass={
                                    plan.label.toLocaleLowerCase() ==
                                    "announcement"
                                        ? " h-[196px] w-[30%]"
                                        : "h-[196px] w-[17.5%]"
                                }
                                label={plan.label}
                                labelDivClass={`h-[82px]  ${
                                    plan.label.toLocaleLowerCase() ==
                                    "announcement"
                                        ? ""
                                        : "!items-center"
                                }`}
                                descriptionDivClass={`h-[114px] text-[#727272]
                            ${
                                plan.label.toLocaleLowerCase() == "announcement"
                                    ? "  "
                                    : " !items-center "
                            }`}
                                description={plan.description}
                            />
                        ))}
                    </div>
                    <div className="flex ml-[25px] my-2">
                        <span className=" text-[22px] font-bold text-[#4CA7A5]">
                            Features
                        </span>
                    </div>
                    {subscription.features?.map(
                        (feature: any, index: number) => (
                            <ListHeader
                                // index={index}
                                key={index}
                                label={feature.label}
                                count={feature.children.length}
                                guest={feature.guest}
                                essential={feature.essential}
                                professional={feature.professional}
                                premium={feature.premium}
                            >
                                {feature.children.map(
                                    (child: any, idx: number) => (
                                        <ListHeader
                                            index={idx}
                                            key={idx}
                                            label={child.feature}
                                            guest={child.guest}
                                            essential={child.essential}
                                            professional={child.professional}
                                            premium={child.premium}
                                        />
                                    )
                                )}
                            </ListHeader>
                        )
                    )}
                    <div className="flex flex-row mt-3">
                        <div className="w-[47.5%]"></div>
                        <div
                            className="w-[17.5%] flex justify-center items-center"
                            id={"essential_plan"}
                        >
                            <button className="flex justify-center items-center bg-dtech-new-main-light p-4 w-[150px] rounded-full mx-2 cursor-pointer">
                                <span className="text-white">Select plan</span>
                            </button>
                        </div>
                        {/* <div className="w-[17.5%] flex justify-center items-center">
                            <button className="flex justify-center items-center bg-[#4CA7A5] p-4 w-[150px] rounded-full mx-2 cursor-pointer">
                                <span className="text-white">Active plan</span>
                            </button>
                        </div> */}
                        <div
                            className="w-[17.5%] flex justify-center items-center"
                            id={"professional_plan"}
                        >
                            <button className="flex justify-center items-center bg-dtech-new-main-light p-4 w-[150px] rounded-full mx-2 cursor-pointer">
                                <span className="text-white">Select plan</span>
                            </button>
                        </div>
                        <div
                            className="w-[17.5%] flex justify-center items-center"
                            id={"premium_plan"}
                        >
                            <button className="flex justify-center items-center bg-dtech-new-main-light p-4 w-[150px] rounded-full mx-2 cursor-pointer">
                                <span className="text-white">Select plan</span>
                            </button>
                        </div>
                    </div>

                    <Card
                        cardOuterClass={
                            "w-full  !items-center  border-t-4 mt-10 border-b-none shadow-none"
                        }
                        label={"Add- ons (paid)"}
                        labelDivClass={` px-5 h-[40px] !text-base !shadow-md  `}
                    />
                    <AddOns disableContact={true} />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center my-12">
                    <SubscriptionDropdown label={"Professional"} />
                    <div className=" my-8">
                        <SubscriptionDropdown label={"Essential"} />
                        <div className="bg-[#6DCDCB] h-14 w-60 flex flex-row justify-center items-center my-0.5">
                            <span>Free(active account)</span>
                        </div>
                    </div>
                    <SubscriptionDropdown label={"Premium"} />

                    <div className="w-60">
                        <Card
                            cardOuterClass={
                                "w-full rounded-lg !items-center  border-t-4"
                            }
                            label={"Announcement"}
                            labelDivClass={`!items-center h-[40px] !text-base `}
                            descriptionDivClass={`!justify-center !items-center  w-[218px] py-2 !text-sm !text-[#727272]`}
                            description={
                                "Discounted Bundles available for  organisations"
                            }
                        />

                        <Card
                            cardOuterClass={
                                "w-full rounded-lg !items-center  border-t-4 mt-10 border-b-none shadow-none"
                            }
                            label={"Add- ons (paid)"}
                            labelDivClass={`!items-center h-[40px] !text-base !shadow-md  rounded-lg`}
                            descriptionDivClass={`!justify-center !items-center  w-[218px] py-2 !text-sm !text-[#727272]`}
                        />
                        <AddOns />
                    </div>
                </div>
            )}
        </>
    );
};
export default SubscriptionSection;
