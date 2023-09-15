import Link from "next/link"
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";

const CustomLink = ({ item }: any) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className=" sm:mb-3 mb-1 hover:bg-[#D9EFFC] focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:border-b-2 active:bg-[#FDD522] focus:bg-[#FDD522]">
            {
                item.target
                    ?
                    <a target="_blank" rel="noopener noreferrer" href={item.link}> {item.label}</a>
                    :
                    (item?.isAuthRequired && !user)
                        ?
                        <div data-tip="Please login to access this">
                            {item.label}
                            <ReactTooltip effect="solid" className=" font-bold !bg-dtech-dark-teal" textColor={'white'}  backgroundColor="#4CA7A5"/>
                        </div>
                        :
                        <Link href={item.link}>{item.label}</Link>
            }
        </div >
    )
}

export default CustomLink;