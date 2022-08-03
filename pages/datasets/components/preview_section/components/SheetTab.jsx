import { useState } from "react";

const TabButton = ({ tab, setActive }) => {
    return (
        <button
            className="whitespace-nowrap"
            onClick={() => {
                setActive(tab);
            }}
        >
            {tab}
        </button>
    );
};

const SheetTab = ({ tabList, setActive }) => {
    return (
        <div className="overflow-x-auto overflow-scroll w-full mt-7">             
        <span className="mr-5 font-medium">Tabs:</span>
            <ul className="inline-flex">
                {tabList.map((item, idx) => (
                    <li
                        key={idx}
                        className={`px-3 py-1 text-sm font-semibold  border-b-[2.5px] rounded-t transition ${
                            item.active
                                ? "text-gray-900 border-gray-600"
                                : "text-gray-300 border-gray-100 hover:text-gray-600"
                        }`}
                    >
                        <TabButton tab={item.tab} setActive={setActive} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SheetTab;
