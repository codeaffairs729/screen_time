import { Tab } from "@headlessui/react";
import Image from "next/image";
import reportOutline from "public/images/icons/report_outline.svg";
import reportFilled from "public/images/icons/report_filled.svg";
import { useState } from "react";
import TabIconHeader from "components/UI/tab_icon_header";
import accountDetailsOutline from "public/images/icons/account_details_outline.svg";
import accountDetailsFilled from "public/images/icons/account_details_filled.svg";
import subscriptionOutline from "public/images/icons/subscription_outline.svg";
import subscriptionFilled from "public/images/icons/subscription_filled.svg";
import paymentOutline from "public/images/icons/payment_outline.svg";
import paymentFilled from "public/images/icons/payment_filled.svg";
type Header = {
    name: string;
    outlineIcon: string;
    filledIcon: string;
};

const HEADERS: Header[] = [
    {
        name: "Account details",
        outlineIcon: accountDetailsOutline,
        filledIcon: accountDetailsFilled,
    },
    {
        name: "Subscription",
        outlineIcon: subscriptionOutline,
        filledIcon: subscriptionFilled,
    },
    {
        name: "Payment",
        outlineIcon: paymentOutline,
        filledIcon: paymentFilled,
    },
];

const AccountTabHeaders = ({
    selectedIndex = 0,
}: {
    selectedIndex?: number;
}) => {
    const [selected, setSelected] = useState<number>(selectedIndex);

    return (
        <Tab.List className="relative text-dtech-main-dark flex flex-row md:flex-col overflow-x-auto">
            {HEADERS.map((header: Header, index: number) => (
                <TabIconHeader key={index} onClick={() => setSelected(index)}>
                    <Image
                        src={
                            selected === index
                                ? header.filledIcon
                                : header.outlineIcon
                        }
                        width="36px"
                        height="36px"
                        alt={header.name}
                    />
                    <span className="text-dtech-main-dark text-lg font-medium">
                        {header.name}
                    </span>
                </TabIconHeader>
            ))}
        </Tab.List>
    );
};

export default AccountTabHeaders;
