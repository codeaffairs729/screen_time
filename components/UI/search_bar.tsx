import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import clsx from "clsx";
import { SingleValue, components } from "react-select";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Http from "common/http";
import { usereventSearchQuery } from "services/usermetrics.service";
import { IoSearchOutline } from "react-icons/io5";
import Dropdown, { MenuItemType } from "./drop_down";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateSearchType } from "store/search/search.action";

// export type SearchOption = { type: string; value: any; label: string };
const ITEMS: MenuItemType[] = [
    { label: "Dataset" },
    { label: "Topic" },
    { label: "Region" },
    { label: "Organisation" },
];

const SearchBar = ({
    onChange,
    className = "",
    selectClasses = "",
    placeholder = "Search e.x.  “Covid in Scotland”",
}: {
    onChange: any;
    className?: string;
    selectClasses?: string;
    placeholder?: string;
}) => {
    const searchType = useSelector((state: RootState) => state.search.type);
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
            <AsyncSelect
                cacheOptions
                loadOptions={
                    searchType === "dataset" ? loadAutoComplete : () => {}
                }
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 70,
                })}
                components={{
                    Menu,
                    MenuList: searchType === "dataset" ? MenuList : () => null,
                    Option,
                    Control,
                    Placeholder: () => null,
                    IndicatorsContainer,
                    ValueContainer,
                }}
                // inputClassName="dataset-search-input"
                className={clsx(
                    "dataset-search-input w-[584px] bg-[#F6EDFC] rounded-[42px]",
                    selectClasses
                )}
                defaultOptions
                instanceId="product-search"
                placeholder={placeholder}
                onChange={(option: any) => {
                    onChange(searchType, option);
                }}
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
                        onChange(searchType, {
                            label: "User input",
                            value: input,
                        });
                    }
                }}
            />
        </div>
    );
};

const ValueContainer = ({ children, ...props }: any) => {
    const { pathname } = useRouter();
    const dispatch = useDispatch();
    const [isHomePage, setIsHomePage] = useState(true);
    const searchType = useSelector((state: RootState) => state.search.type);

    const handleSearchTypeChange = (type: string) => {
        dispatch(updateSearchType(type.toLowerCase()));
    };

    const menuItems = ITEMS.map((item) => ({
        ...item,
        onClick: () => handleSearchTypeChange(item.label),
    }));

    useEffect(() => {
        setIsHomePage(pathname === "/");
    }, []);

    return (
        <components.ValueContainer {...props} className="!overflow-visible">
            <div className="flex items-center">
                <IoSearchOutline
                    className={clsx(
                        "rotate-[90deg]  mx-3 text-dtech-main-dark",
                        isHomePage ? "w-8 h-8" : "w-6 h-6"
                    )}
                />
                {children}
                <Dropdown
                    label={`
                            ${searchType[0]?.toUpperCase()}${searchType.slice(
                        1
                    )}
                        `}
                    labelClasses={isHomePage ? "!text-lg" : ""}
                    menuItems={menuItems}
                    itemsClasses={isHomePage ? "!text-lg" : ""}
                />
            </div>
        </components.ValueContainer>
    );
};

const Control = (props: any) => {
    return (
        <components.Control
            {...props}
            className="!border-0 !shadow-none !bg-inherit h-full"
        />
    );
};

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

const IndicatorsContainer = () => null;

export default SearchBar;
