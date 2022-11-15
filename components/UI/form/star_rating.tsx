import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FieldProps } from "common/type";
import { useController } from "react-hook-form";

const StarRatingInput = ({
    className = "",
    formControl,
    dataSelector,
    dontKnow = false,
}: {
    dontKnow?: boolean;
    className?: string;
} & FieldProps) => {
    const [rating, setRating] = useState<any>(0);
    const [hover, setHover] = useState(0);
    const [dk, setDK] = useState(false);

    const {
        fieldState: { error },
        field: { onChange, name },
    } = useController({
        ...formControl,
        defaultValue:
            formControl["defaultValue"] == undefined
                ? ""
                : formControl["defaultValue"],
    });

    const hasError = error && Object.keys(error).length > 0;

    return (
        <>
            <div
                className={`inline-block ${className}`}
                data-selector={dataSelector}
            >
                <div className="flex">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={` bg-transparent border-none outline-none cursor-pointer mx-[0.7px] text-[13px] ${
                                    index <= (hover || rating) && !dk
                                        ? "text-dtech-secondary-dark"
                                        : "text-gray-300"
                                }`}
                                onClick={() => {
                                    setRating(index);
                                    onChange(index);
                                    setDK(false);
                                }}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                {/* <span className="star">&#9733;</span> */}
                                <BsStarFill />
                            </button>
                        );
                    })}
                    {dontKnow && (
                        <div className="mx-4 mb-0.5">
                            <input
                                type="checkbox"
                                className="w-3 h-3 border-0 bg-gray-300 text-dtech-secondary-dark outline-none focus-none"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setRating(0);
                                        onChange(0);
                                        setDK(true);
                                    } else {
                                        setRating(undefined);
                                        onChange(undefined);
                                        setDK(false);
                                    }
                                }}
                                checked={dk}
                            />
                            <span className="text-xs text-dtech-secondary-dark ml-2">
                                {"Don't know"}
                            </span>
                        </div>
                    )}
                </div>
                {hasError && (
                    <div className="text-xs text-red-800 ml-1 mt-1">
                        {error["message"]}
                    </div>
                )}
            </div>
        </>
    );
};

export default StarRatingInput;
