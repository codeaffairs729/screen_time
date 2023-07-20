import Link from "next/link"

const CustomLink = ({ item }: any) => {
    return (
        <div className=" sm:mb-3 mb-1 hover:bg-[#D9EFFC] focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:border-b-2 active:bg-[#FDD522] focus:bg-[#FDD522]">
            {
                item.target
                    ?
                    <a target="_blank" rel="noreferrer" href={item.link}> {item.label}</a>
                    :
                    <Link href={item.link}>{item.label}</Link>
            }
        </div >
    )
}

export default CustomLink;