import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import useSWR from "swr";
import clsx from "clsx";
import { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export type SearchOption = { value: any; label: string };

const DatasetSearchInput = ({
  onChange,
  className = "",
}: {
  onChange: (option: SingleValue<SearchOption>) => void;
  className?: string;
}) => {
  const loadAutoComplete = debounce(async (inputValue: string) => {
    if (!inputValue) return;
    let options: SearchOption[] = [];
    options = [
      {
        value: "health",
        label: "Health",
      },
      {
        value: "covid",
        label: "Covid",
      },
    ];
    return options;
  });

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
