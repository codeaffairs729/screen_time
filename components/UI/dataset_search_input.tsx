import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import useSWR from "swr";
import clsx from "clsx";
import { SingleValue } from "react-select";

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

  const Option = ({ data, innerProps, isDisabled }: any) => {
    return (
      // <button onClick={() => onClickOption(props.data)} className="w-full">
      <div
        {...innerProps}
        className="hover:bg-dtech-secondary-light hover:text-gray-100 hover:no-underline text-gray-800 block w-full text-sm text-left px-2.5 py-2"
      >
        {data.label}
      </div>
      // </button>
    );
  };

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
      />
    </div>
  );
};

export default DatasetSearchInput;
