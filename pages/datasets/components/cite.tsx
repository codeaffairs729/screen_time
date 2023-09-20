import CiteQuotes from "public/images/icons/cite_quote.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Cite = ({ citation, url }: { citation: string, url: string }) => {
    const [viewAll, setViewAll] = useState<boolean>(false);
    const handleSearchFocus = () => {
        setViewAll(true);
    };

    const handleSearchBlur = () => {
        setViewAll(false);
    };
    const handleCopyClick = () => {
        // Create a textarea element and set its value to the citation text
        const textArea = document.createElement('textarea');
        textArea.value = citation+url;

        // Append the textarea to the document
        document.body.appendChild(textArea);

        // Select the text inside the textarea
        textArea.select();

        // Copy the selected text to the clipboard
        document.execCommand('copy');

        // Remove the textarea from the document
        document.body.removeChild(textArea);

        // Provide some visual feedback to the user (optional)
        alert('Citation copied to clipboard');
    };
    const myRef = useRef(null);
    useOutsideAlerter(myRef);
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            // Function for click event
            function handleOutsideClick(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setViewAll(viewAll);
                }
            }
            // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
            return () =>
                document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }
    return (
        <div className="py-3">
            {<div onClick={handleSearchBlur}
                className={viewAll ? ` bg-black absolute opacity-50 h-[3000px] top-0 right-0 sm:h-[3000px]  w-screen flex items-center  z-20` : "hidden"}></div>}
            <div className=" flex flex-col justify-center items-center"
                onClick={() => setViewAll(!viewAll)}
            >
                <Image src={CiteQuotes} />
                <div className="text-dtech-new-main-light mt-2 text-base font-roboto">
                    Cite
                </div>
            </div>
            {viewAll && <div className="flex flex-wrap flex-row px-6 py-4 lg:w-[50%] text-[#000000] w-xs bg-white absolute left-[25%] z-20 rounded-xl">
                <div className="flex justify-between w-full pb-4">
                    <div className=" w-[50%] pb-1 border-b-2">Cite</div>
                    <div className=" cursor-pointer" onClick={() => setViewAll(!viewAll)}><img src="/images/provider-detail-page/close.svg" /></div>
                </div>
                <div className=" flex flex-row justify-between">
                    <span className=" w-[70%]">{citation} <a href={url} rel="noreferrer" target="_blank">{url}</a></span>
                    <div className=" cursor-pointer" onClick={handleCopyClick}><img src="/images/icons/copy.svg"></img></div>
                </div>
            </div>}
        </div>
    )
}
export default Cite;