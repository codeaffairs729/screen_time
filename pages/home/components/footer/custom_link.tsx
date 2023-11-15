import Link from "next/link"
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "store";

const CustomLink = ({ item }: any) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className="w-fit sm:mb-3 mb-1 text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black ">
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