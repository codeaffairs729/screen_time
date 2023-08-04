import { Combobox } from "@headlessui/react";
import { BsCheck } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";


export interface Option {
    id: number;
    name: string;
}

const ComboboxOption = ({ item, setOpen, key, onDelete, handleOnBlur }: {
    item: Option, setOpen: any, key: any, onDelete: (id: number) => void, handleOnBlur:any
}) => {
    const handleDeleteClick = (event: any) => {
        event.stopPropagation();
        onDelete(item.id);
    };
    return (
        <Combobox.Option
            onClick={() => {
                setOpen(false)
                handleOnBlur(); // Trigger onBlur of the parent div using the ref
            }}
            className={({ active }) =>
                `relative cursor-default select-none py-2 px-4 ${active ? " bg-[#D9EFFC] text-dtech-dark-grey" : "text-gray-900"
                }`
            }
            value={item}
            key={key}
        >
            {({ selected, active }) => (
                <>
                    <span
                        className={` flex flex-row space-x-2 truncate  ${selected ? "font-medium" : "font-normal"
                            }`}
                    >
                        {/* uncomment line to show history icon
                        <img src='/images/icons/history.svg'></img> */}
                        <div className=" flex items-end w-full">
                            {item.name}
                            {/* {active && <button
                                className="w-full flex justify-end"
                            >
                                <RxCross1
                                    title="Delete"
                                    className=" cursor-pointer"
                                    onClick={handleDeleteClick}
                                    size={20}
                                />
                            </button>} */}
                        </div>
                    </span>
                    {/* {selected ? (
                        <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                                }`}
                        >
                            <BsCheck aria-hidden="true" />
                        </span>
                    ) : null} */}
                </>
            )}
        </Combobox.Option>
    );
};

export default ComboboxOption
