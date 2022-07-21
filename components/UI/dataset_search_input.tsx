import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import useSWR from "swr";
import clsx from "clsx";
import { SingleValue, components } from "react-select";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Http from "common/http";

export type SearchOption = { value: any; label: string };

const DatasetSearchInput = ({
    onChange,
    className = "",
}: {
    onChange: (option: SingleValue<SearchOption>) => void;
    className?: string;
}) => {
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
                // return [
                //   { label: "covid", value: "covid" },
                //   { label: "health", value: "health" },
                // ];
            }, 500),
        []
    );

    const Option = ({ data, innerProps }: any) => {
        return (
            <div
                {...innerProps}
                className="hover:bg-dtech-secondary-light hover:text-gray-100 hover:no-underline text-gray-800 block w-full text-sm text-left px-2.5 py-2"
            >
                {data.label}
            </div>
        );
    };

    const Input = (props: any) => {
        // add attribues to the component below
        return <components.Input {...props} data-selector="dataset-search-input" />;
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
        <div className={clsx(className)}>
            <AsyncSelect
                cacheOptions
                loadOptions={loadAutoComplete}
                components={{ Option }}
                // inputClassName="dataset-search-input"
                className="dataset-search-input"
                defaultOptions
                placeholder="Search..."
                instanceId="product-search"
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

export default DatasetSearchInput;
