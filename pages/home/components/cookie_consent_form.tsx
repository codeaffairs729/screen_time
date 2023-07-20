import { useState } from "react";
const CookieConsentForm = () => {
    const [showForm, setShowForm] = useState(true)
    if (showForm)
    return (
        <div className="px-6 sm:px-[10%] py-3 bg-dtech-middle-grey z-50 text-sm sm:text-lg flex flex-col sm:mt-32  fixed sm:absolute">
            <div>
            We use <span className=" underline text-dtech-main-dark hover:cursor-pointer">cookies</span> to make your interactions with our website more meaningful. They help us better understand how our website is used, so we can tailor content for you. Click &lsquo;Accept all cookies&lsquo; to agree to all cookies that collect anonymous data. 
            You can decide which optional cookies to accept by clicking on &lsquo;Manage Settings&lsquo;.
            </div>
            <div className="flex flex-row items-center my-3">
                <button className=" bg-dtech-new-main-light rounded-lg text-white p-3 hover:animate-pulse hover:bg-dtech-main-dark focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522]" onClick={()=>setShowForm(false)}>Accept all cookies</button>
                <div className="text-dtech-main-dark mx-4 hover:cursor-pointer hover:animate-pulse hover:bg-[#D9EFFC] focus-within:bg-[#FDD522] focus-within:border-b-2 focus-within:border-black active:bg-[#FDD522] focus:bg-[#FDD522]" onClick={() => setShowForm(false)}>Manage preferences</div>
                    
            </div>
        </div>
        )
    return null
}

export default CookieConsentForm;