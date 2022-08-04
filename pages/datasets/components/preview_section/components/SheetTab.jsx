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
        <div className="mt-7">
            {/* <div className="mr-5 mb-2font-medium">Tabs available</div> */}
            <p className="text-sm font-bold mb-4 ml-5">Tabs available</p>
            <div className="overflow-x-auto overflow-scroll w-full">
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
        </div>
    );
};

export default SheetTab;
