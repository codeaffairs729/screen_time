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
                        label={"Why is Dtechtive interesting to Data Users?"}
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            Dtechtive is a search engine that helps people find
                            datasets from websites that existing search engines
                            fail to index. This is possible because of the
                            intelligent and comprehensive dataset onboarding
                            process adopted by Dtechtive. Since the onboarding
                            process is continuous, people will get access to the
                            latest versions of the published datasets. The
                            search results are not just keyword matches but also
                            contextual (semantic matching), helping people
                            discover a wider set of datasets using simple search
                            terms. Dtechtive also provides insights on dataset
                            quality and usage, helping people select the most
                            relevant datasets for their use cases. Most
                            importantly, Dtechtive allows Data Users to give
                            feedback to Data Providers, helping them improve
                            dataset quality.
                        </span>
                    </Accordian>
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={
                            "Why is Dtechtive interesting to Data Providers?"
                        }
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            Dtechtive onboards datasets (metadata only) from
                            open and commercial Data Providers onto the search
                            engine at no cost. This makes the datasets more
                            discoverable to people, helping generate interest in
                            the organisation and its datasets. For commercial
                            data providers, this may act as a sales funnel to
                            generate leads. Further, Dtechtive delivers insights
                            on dataset quality (metadata and data file), helping
                            Data Providers take action to improve downstream
                            (data processing, analysis, visualisation, et al.)
                            efficiencies for Data Users. Dtechtive also delivers
                            insights on dataset usage (search terms used,
                            download metrics, use cases, et al.), helping Data
                            Providers understand the Data User needs better.
                            Using Dtechtive, all of these insights can be
                            transferred into editable reports to help Data
                            Providers easily create business cases. 💡 If you
                            are an open or commercial Data Provider who would
                            like to arrange a call with us, please
                            <a
                                className="text-blue-600"
                                href="https://calendly.com/d/dmc-3n6-p55/dtechtive?month=2023-03"
                            >
                                {" "}
                                use this link.
                            </a>
                        </span>
                    </Accordian>
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={
                            "How can Dtechtive help Enterprises with custom needs?"
                        }
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            While Dtechtive makes open and commercial datasets
                            more discoverable, it can also help employees within
                            Enterprises find internal datasets easily. This will
                            saves many human hours that may be used for more
                            value added activities. Moreover, data
                            enablers/stewards within these Enterprises can
                            gather useful insights on how employees are engaging
                            with data and help accelerate data-informed decision
                            making with the organisation. 💡 If you are
                            representing an Enterprise with custom needs, please
                            <a
                                className="text-blue-600"
                                href="https://calendly.com/d/dmc-3n6-p55/dtechtive?month=2023-03"
                            >
                                use this link
                            </a>{" "}
                            to arrange a call with us.
                        </span>
                    </Accordian>
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={
                            "Do I need to create an account to use Dtechtive?"
                        }
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            You can search for datasets (unlimited) and access
                            useful features (limited) as a guest user. However,
                            creating a free account will help you unlock a lot
                            of useful features and improve data discoverability
                            for all. 💡 If you are an individual Data User, we
                            encourage you to create a free account{" "}
                            <a
                                className="text-blue-600"
                                href="https://dtechtive.com/signup?signup_type=individual"
                            >
                                using this link.
                            </a>{" "}
                            💡 If you are representing an Organisation with one
                            or more Data Users, you may{" "}
                            <a
                                className="text-blue-600"
                                href="https://dtechtive.com/signup?signup_type=org_admin"
                            >
                                use this link.
                            </a>{" "}
                            💡 If you are an open or commercial Data Provider,
                            we encourage you to create a free account on
                            Dtechtive{" "}
                            <a
                                className="text-blue-600"
                                href="https://dtechtive.com/signup?signup_type=org_admin"
                            >
                                using this link
                            </a>{" "}
                            and submit your data source website details{" "}
                            <a
                                className="text-blue-600"
                                href="https://dtechtive.com/login"
                            >
                                using this form
                            </a>{" "}
                            to help us start the dataset onboarding process.
                        </span>
                    </Accordian>
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={
                            "What are the paid subscription plans on Dtechtive?"
                        }
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            Since we are in the early stages, all the features
                            will be accessible for free to the early adopter
                            Data Users and Data Providers who have created
                            accounts on Dtechtive. We are doing this to gather
                            valuable feedback to help improve the product for
                            all. That said, even in the long run, we are hoping
                            that the search and many other useful features will
                            be available for free with reasonable daily limits
                            (number of search queries per day, downloads per
                            day, etc.) to those who have created accounts.
                            Whenever they are introduced to sustain the product,
                            the paid plans will provide unlimited access to all
                            features. 💡 If you are an early adopter, please{" "}
                            <a
                                className="text-blue-600"
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfzVMws_whcmJFbjYtR63N9xBYWOW3yYKPzVr7ewHum-saLsw/viewform"
                            >
                                use this link
                            </a>{" "}
                            to report any issues/bugs with the current version.
                            💡 If you would like to get on a call with us,
                            please{" "}
                            <a
                                className="text-blue-600"
                                href="https://calendly.com/d/dmc-3n6-p55/dtechtive?month=2023-03"
                            >
                                use this link.
                            </a>
                        </span>
                    </Accordian>
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={"How does Dtechtive assess dataset quality?"}
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            Dtechtive assesses metadata quality and data file
                            quality using different approaches. Metadata quality
                            is assessed algorithmically based on the{" "}
                            <a
                                className="text-blue-600"
                                href="https://data.europa.eu/mqa/methodology?locale=en"
                            >
                                Metadata Quality Assessment (MQA) methodology{" "}
                            </a>{" "}
                            of the European Commission inspired by the FAIR
                            principles of the GO{" "}
                            <a
                                className="text-blue-600"
                                href="https://www.go-fair.org/fair-principles/"
                            >
                                FAIR principles{" "}
                            </a>{" "}
                            Data file quality is assessed based on user feedback
                            gathered through Dtechtive.
                        </span>
                    </Accordian>
                    <Accordian
                        className="!bg-dtech-main-light"
                        label={"How does Dtechtive assess dataset quality?"}
                    >
                        <span className="px-4 py-2 w-full text-sm">
                            Yes, we are developing a feature that will enable
                            any registered user to upload their datasets to
                            Dtechtive and publish them for better
                            discoverability. This feature will be available in
                            the My Workspace page.
                        </span>
                    </Accordian>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default FAQPage;
