import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import useSWR from "swr";

export type SearchOption = { value: any; label: string };

const DatasetSearchInput = ({
  onClickOption,
}: {
  onClickOption: (option:SearchOption) => void;
}) => {
  const loadAutoComplete = debounce(async (inputValue: string) => {
    if (!inputValue) return;
    console.log("inputValue", inputValue);

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

  const Option = (props: any) => {
    return (
      <div>
        {
          <button onClick={()=>onClickOption(props.data)} className="w-full">
            <a className="hover:bg-dtech-secondary-light hover:text-gray-100 hover:no-underline text-gray-800 block w-full text-sm text-left px-2.5 py-2">
              {props.data.label}
            </a>
          </button>
        }
      </div>
    );
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadAutoComplete}
      components={{ Option }}
      defaultOptions
      placeholder="Search..."
      instanceId="product-search"
    />
  );
};

export default DatasetSearchInput;