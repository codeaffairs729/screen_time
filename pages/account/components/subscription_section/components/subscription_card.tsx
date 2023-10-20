const Card = ({
    cardOuterClass = "",
    labelDivClass,
    descriptionDivClass = "",
    label = "",
    description = "",
}: {
    cardOuterClass?: string;
    labelDivClass?: string;
    descriptionDivClass?: string;
    label?: string;
    description?: string;
}) => {
    return (
        <div
            className={`${cardOuterClass} bg-white shadow-lg mx-1 border-t-2 border-[#4CA7A5]`}
        >
            <div
                className={`${labelDivClass} border-t-3 shadow-lg text-[#4CA7A5]  flex flex-col justify-center items-start  text-[22px]`}
            >
                <span
                    className={`font-bold leading-4  ${
                        label === "Announcement" && " ml-[25px]"
                    }`}
                >
                    {label}
                </span>
            </div>
            <div
                className={`flex flex-col justify-center items-start ${descriptionDivClass}`}
            >
                <span
                    className={` ${label === "Announcement" && " ml-[25px]"}`}
                >
                    {description}
                </span>
            </div>
        </div>
    );
};

export default Card;