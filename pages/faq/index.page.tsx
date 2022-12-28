import DefaultLayout from "components/layouts/default";
import Accordian from "components/UI/accordian";

const FAQPage = () => {
    return (
        <DefaultLayout>
            <div className="mx-4 md:mx-20 my-2">
                <span className="text-dtech-dark-grey font-semibold text-2xl">
                    Frequently asked questions
                </span>
                <div className="py-6 mt-6 rounded-[20px] px-10 bg-dtech-light-grey min-h-[60vh]">
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={"How do you determine Metadata Quality?"}
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            We follow the Metadata Quality Assessment
                            methodology of the we follow the Metadata Quality
                            Assessment methodology of the we follow the Metadata
                        </span>
                    </Accordian>
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={"What is your refund policy?"}
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            If you&rsquo;re unhappy with your purchase for any
                            reason, email us within 90 days and we&rsquo;ll
                            refund you in full, no questions asked.
                        </span>
                    </Accordian>
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={"Do you offer technical support?"}
                    >
                        <span className="px-4 py-2 w-full text-sm">No</span>
                    </Accordian>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default FAQPage;
