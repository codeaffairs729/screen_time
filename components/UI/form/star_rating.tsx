import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FieldProps } from "common/type";
import { useController } from "react-hook-form";

const StarRatingInput = ({
    className = "",
    starClassName = "",
    formControl,
    dataSelector,
    dontKnow = false,
}: {
    dontKnow?: boolean;
    className?: string;
    starClassName?: string;
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
                                className={` bg-transparent border-none outline-none cursor-pointer mx-[0.7px] text-m  ${
                                    index <= (hover || rating) && !dk
                                        ? "text-gray-500"
                                        : "text-gray-500"
                                }`}
                                onClick={() => {
                                    onChange(index);
                                    rating == index
                                        ? (setRating(undefined),
                                          onChange(undefined))
                                        : setRating(index);
                                    setDK(false);
                                }}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                {/* <span className="star">&#9733;</span> */}
                                {index <= (hover || rating) ? (
                                    <BsStarFill className={starClassName} />
                                ) : (
                                    <BsStar className={starClassName} />
                                )}
                            </button>
                        );
                    })}
                    {dontKnow && (
                        <div className="mx-4 mb-0.5">
                            <input
                                type="checkbox"
                                className="w-4 h-4 border-1 bg-gray-100 text-dtech-main-dark outline-none focus-none"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setRating(0);
                                        setHover(0);
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
                            <span className="text-sm  ml-2">
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
