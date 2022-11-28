import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import useSWR from "swr";
import clsx from "clsx";
import Select, {
    SingleValue,
    components,
    ControlProps,
    Props,
    StylesConfig,
} from "react-select";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Http from "common/http";
import { usereventSearchQuery } from "services/usermetrics.service";
import { IoSearchOutline } from "react-icons/io5";
import Dropdown, { MenuItemType } from "./drop_down";

export type SearchOption = { value: any; label: string };
const ITEMS: MenuItemType[] = [
    { label: "Topic" },
    { label: "Region" },
    { label: "Organization" },
    { label: "Dataset" },
];

const SearchBar = ({
    onChange,
    className = "",
    image = "",
}: {
    onChange: (option: SingleValue<SearchOption>) => void;
    className?: string;
    image?: string;
}) => {
    const [activeSearchCategory, setActiveSearchCategory] = useState<string>(
        ITEMS[0].label
    );
    const menuItems = ITEMS.map((item) => ({
        ...item,
        onClick: () => setActiveSearchCategory(item.label),
    }));

    const loadAutoComplete = useMemo(
        () =>
            debounce(async (inputValue: string) => {
                if (!inputValue) return;
                const res = await Http.get<[]>("", {
                    baseUrl: `${process.env.NEXT_PUBLIC_SENTIMENT_API_ROOT}/completion/${inputValue}`,
                });
                return res.map((t) => ({
                    value: t[0],
                    label: t[0],
                }));
            }, 500),
        []
    );
    const Option = ({ data, innerProps }: any) => {
        return (
            <div
                {...innerProps}
                className="p-3 bg-[#FAFAFA] text-[17px] cursor-pointer hover:bg-[#F6EDFC]"
            >
                {data.label}
            </div>
        );
    };
    const MenuList = (props: any) => {
        return (
            <components.MenuList
                {...props}
                className="bg-[#FAFAFA] text-[17px] !rounded-none"
            />
        );
    };
    const Menu = (props: any) => {
        return (
            <components.Menu
                {...props}
                className="!w-[90%] left-[50%] translate-x-[-50%] shadow-list-shdaow bg-[#FAFAFA] !top-[80%] !rounded-none"
            />
        );
    };

    const SingleValue = () => {
        return null;
    };

    const Input = (props: any) => {
        // add attribues to the component below
        return (
            <div className="flex items-center">
                <IoSearchOutline className="rotate-[90deg] w-6 h-6 mx-3" />
                <components.Input
                    placeholder="Search e.x.  Covid in Scotland"
                    data-selector="dataset-search-input"
                    className="p-1"
                    {...props}
                />
                <Dropdown
                    label={activeSearchCategory}
                    menuItems={menuItems}
                    menuItemsClasses="translate-x-[-50%]"
                />
            </div>
        );
    };

    const ValueContainer = (props: any) => {
        return (
            <components.ValueContainer
                {...props}
                className="!overflow-visible"
            />
        );
    };

    const IndicatorsContainer = () => {
        return null;
    };

    const Control = (props: any) => {
        return (
            <components.Control
                {...props}
                className="!border-0 !shadow-none !bg-[#F6EDFC]"
            />
        );
    };

    const {
        query: { q },
    } = useRouter();
    useEffect(() => {
        if (q) {
            setInput(q as string);
        }
    }, [q]);
    const [input, setInput] = useState("");
    return (
        <div className={clsx("mx-auto", className)}>
            {/* <span>{image && <Image src={image} />}</span> */}
            <AsyncSelect
                cacheOptions
                loadOptions={loadAutoComplete}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 70,
                })}
                components={{
                    Menu,
                    MenuList,
                    Input,
                    Option,
                    Control,
                    SingleValue,
                    IndicatorsContainer,
                    ValueContainer,
                }}
                // inputClassName="dataset-search-input"
                className="dataset-search-input w-[584px]"
                defaultOptions
                instanceId="product-search"
                placeholder=""
                onChange={onChange}
                inputValue={input}
                onInputChange={(value, action) => {
                    // only set the input when the action that caused the
                    // change equals to "input-change" and ignore the other
                    // ones like: "set-value", "input-blur", and "menu-close"
                    if (action.action === "input-change") setInput(value); // <---
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        usereventSearchQuery(input);
                        onChange({
                            label: "User input",
                            value: input,
                        });
                    }
                }}
            />
        </div>
    );
};
export default SearchBar;
