import React from "react";

/**
 * Display of the word component.
 *
 * Props
 * -----
 * keyword: String, The keyword to be diaplyed.
 * skipFunc: Function, Function to to skip the keyword on clicking the word.
 */

type Props = {
    keyword: string;
    skipFunc: () => void;
};

const WordDisplay = ({ keyword, skipFunc }: Props) => {
    return (
        <div className="mt-10 text-3xl font-bold text-black text-center">
            <span onClick={skipFunc}>&ldquo;{keyword}&rdquo;</span>
        </div>
    );
};

export default WordDisplay;
