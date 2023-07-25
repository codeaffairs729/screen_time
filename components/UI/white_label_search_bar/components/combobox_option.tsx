import { Combobox } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";


export interface Option {
    id: number;
    name: string;
}

const ComboboxOption = ({ item, setOpen, key }: { item: Option, setOpen: any, key:any }) => {
    return (
        <Combobox.Option
            onClick={() => setOpen(false)}
            className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-dtech-main-light text-dtech-dark-grey" : "text-gray-900"
                }`
            }
            value={item}
            key={key}
        >
            {({ selected, active }) => (
                <>
                    <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                    >
                        {item.name}
                    </span>
                    {selected ? (
                        <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                                }`}
                        >
                            <BsCheck aria-hidden="true" />
                        </span>
                    ) : null}
                </>
            )}
        </Combobox.Option>
    );
};

export default ComboboxOption
