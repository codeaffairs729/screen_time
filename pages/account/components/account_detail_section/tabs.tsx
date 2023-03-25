import { Tab } from "@headlessui/react";
import User from "models/user.model";
import { useSelector } from "react-redux";
import { RootState } from "store";

const TabHeaders = ({
    selectedAccountTab,
    setSelectedAccountTab,
}: {
    selectedAccountTab: any;
    setSelectedAccountTab: any;
}) => {
    const user = useSelector((state: RootState) => state.auth.user);
    enum insightTabIndex {
        user,
        admin,
    }
    const onTabSelect = (selectedTab: string) => {
        setSelectedAccountTab(
            getSelectedLabelIndex(selectedTab, insightTabIndex)
        );
    };

    return (
        <Tab.List
            className={"md:ml-32 flex space-x-20 justify-start items-center "}
        >
            <div>
                <HeadTag
                    isSelected={selectedAccountTab == 0}
                    label={"user"}
                    setSelected={onTabSelect}
                ></HeadTag>
            </div>
            {User.isOrgAdmin(user) && (
                <div className="ml-10">
                    <HeadTag
                        isSelected={selectedAccountTab == 1}
                        label={"admin"}
                        setSelected={onTabSelect}
                    ></HeadTag>
                </div>
            )}
        </Tab.List>
    );
};

const HeadTag = ({
    isSelected = false,
    label,
    setSelected,
}: {
    label: string;
    isSelected?: boolean;
    setSelected: Function;
}) => {
    const labelToShow = label
        .split("_")
        .map((w: string) => `${w[0].toUpperCase()}${w.slice(1)}`)
        .join(" ");

    return (
        <Tab onClick={() => setSelected(label)}>
            <div
                className={`relative inline-block text-left select-none outline-none `}
            >
                <span
                    className={`text-dtech-main-dark text-lg hover:underline underline-offset-4 ${
                        isSelected && "underline underline-offset-4"
                    }`}
                >
                    {labelToShow}
                </span>
            </div>
        </Tab>
    );
};

const getSelectedLabelIndex = (label: string, types: any) => {
    return types[label];
};
export default TabHeaders;
