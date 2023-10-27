import AddOns from "./components/add_ons";
import SubscriptionDropdown from "./components/subscription_dropdown";
import ListHeader from "./components/list";
import Card from "./components/subscription_card";
import { useIsMobile } from "common/hooks";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
const subscription = require("../subscription_section/subscription_plan_feature.json");

const SubscriptionSection = () => {
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const { isMobile } = useIsMobile();
    console.log("openPopup :", openPopup);
    return (
        <>
            {!isMobile ? (
                <div className="flex flex-col">
                    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} />

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
                                        : "!items-center !text-bold"
                                }`}
                                descriptionDivClass={`h-[114px] text-[#727272]
                            ${
                                plan.label.toLocaleLowerCase() == "announcement"
                                    ? "  "
                                    : " !items-center "
                            }`}
                                description={plan.description}
                                active={plan.active}
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
                                            subCategories={true}
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
                            <button
                                onClick={() => setOpenPopup(true)}
                                className="flex justify-center items-center bg-dtech-new-main-light p-4 w-[150px] rounded-full mx-2 cursor-pointer"
                            >
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
                            <button
                                onClick={() => setOpenPopup(true)}
                                className="flex justify-center items-center bg-dtech-new-main-light p-4 w-[150px] rounded-full mx-2 cursor-pointer"
                            >
                                <span className="text-white">Active plan</span>
                            </button>
                        </div>
                        <div
                            className="w-[17.5%] flex justify-center items-center"
                            id={"premium_plan"}
                        >
                            <button
                                onClick={() => setOpenPopup(true)}
                                className="flex justify-center items-center bg-dtech-new-main-light p-4 w-[150px] rounded-full mx-2 cursor-pointer"
                            >
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
                        {/* <Card
                            cardOuterClass={
                                "w-full rounded-lg !items-center  border-t-4"
                            }
                            label={"Announcement"}
                            labelDivClass={`!items-center h-[40px] !text-base `}
                            descriptionDivClass={`!justify-center !items-center  w-[218px] py-2 !text-sm !text-[#727272]`}
                            description={
                                "Discounted Bundles available for  organisations"
                            }
                        /> */}

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

const Popup = ({
    openPopup,
    setOpenPopup,
}: {
    openPopup: boolean;
    setOpenPopup: Function;
}) => {
    return (
        <Transition appear show={openPopup} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                open={openPopup}
                onClose={() => setOpenPopup(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="md:w-[407px] md:h-[250px] w-[242px] h-[203x] bg-white p-[38px] rounded-xl border-2 border-dtech-light-teal flex flex-col justify-center items-center relative">
                                <AiOutlineClose
                                    strokeWidth={2}
                                    className={`w-5 h-5 absolute top-0 right-0 m-6 cursor-pointer`}
                                    onClick={() => setOpenPopup(false)}
                                />
                                <div className="md:text-xl text-[12px] font-[400] text-[#000000] mt-4 z-50  text-left">
                                    To change your subscription plan, email us
                                    at &nbsp;
                                    <span className="underline underline-offset-2 cursor-pointer text-[#0065BD]">
                                        dtechtive@dtime.ai
                                    </span>
                                    &nbsp; or arrange a call via &nbsp;
                                    <Link
                                        href={
                                            "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2Y_qEqE_AMtuxvSiL0GjO3wjJ-a3CrOiToFIgmn-t7FiPYduxdsdaprH2yetCTJzX8I5nnoGu1?pli=1"
                                        }
                                    >
                                        <span className="underline underline-offset-2 cursor-pointer text-[#0065BD]">
                                            dtime.ai/meeting
                                        </span>
                                    </Link>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
