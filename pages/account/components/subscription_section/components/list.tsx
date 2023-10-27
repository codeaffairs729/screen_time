import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { VscTriangleDown } from "react-icons/vsc";

const ListHeader = ({
    index,
    label,
    count,
    guest,
    essential,
    professional,
    premium,
    children,
    subCategories= false
}: {
    index?:number;
    label: string;
    count?: number;
    guest: string | boolean;
    essential: string | boolean;
    professional: string | boolean;
    premium: string | boolean;
    children?: Array<any>;
    subCategories?: boolean
}) => {
    const [showSubscription, setShowSubscription] = useState<boolean>(false);

    const onClick = () => {
        setShowSubscription(!showSubscription);
    };
    return (
        <div className=" flex flex-col  ">
            <div className={`flex flex-row border-b-2 py-3 ${ subCategories && "bg-[#EBEBEB]"}`}>
                <List
                    dropdown={count ? true : false}
                    label={count ? `${label} (${count})` : `${label} `}
                    showSubscription={showSubscription}
                    onClick={onClick}
                    outerClass={
                        " w-[30%]  flex justify-start items-center  ml-[25px] "
                    }
                />
                <List
                    label={guest}
                    outerClass={" w-[17.5%]  flex justify-center items-center "}
                />
                <List
                    label={essential}
                    outerClass={" w-[17.5%] flex justify-center items-center "}
                />
                <List
                    label={professional}
                    outerClass={" w-[17.5%] flex justify-center items-center "}
                />
                <List
                    label={premium}
                    outerClass={" w-[17.5%] flex justify-center items-center "}
                />
                {/* <hr className="mt-1 text-[#727272]" /> */}
            </div>
            {showSubscription && <div className="my-2 mb-10">{children}</div>}
        </div>
    );
};

const List = ({
    dropdown = false,
    label,
    outerClass,
    showSubscription,
    onClick,
}: {
    dropdown?: boolean;
    label: string | boolean;
    outerClass?: string;
    showSubscription?: boolean;
    onClick?: any;
}) => {
    // const [showSubscription, setShowSubscription] = useState(false);
    return (
        <div className={`${outerClass} mx-1  `}>
            {!dropdown ? (
                <>
                    {typeof label == "boolean" && label ? (
                        <BsCheck2 />
                    ) : typeof label == "boolean" && !label ? (
                        <span>-</span>
                    ) : (
                        <span>{label}</span>
                    )}
                </>
            ) : (
                <div
                    className={`flex flex-row justify-between items-center w-full cursor-pointer`}
                    onClick={() => onClick()}
                >
                    <div>{label}</div>
                    <div>
                        <VscTriangleDown
                            className={`ml-2 text-2xl text-inherit transition-all ${
                                showSubscription && "rotate-180"
                            }`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListHeader;