import DatasetSearchInput from "components/UI/dataset_search_input";
import Image from "next/image";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/default";
import { usereventSearchQuery } from "services/usermetrics.service";
import SearchBar from "components/UI/search_bar_new";

const HomePage = () => {
    const router = useRouter();

    return (
        <DefaultLayout showLogo={false} showSearchBar={false}>
            <div className="h-[calc(60vh-var(--nav-height))] flex flex-col items-center justify-center mx-2 my-20">
                <div className="max-w-[575px] mx-auto w-full flex flex-col items-center">
                    <span>
                        <Image
                            src="/images/logo/dtechtive_without_tagline.svg"
                            width="315"
                            height="155"
                            alt="Dtechtive logo"
                        />
                        <p className="text-[#c1c1c1] text-[12px] font-medium select-none mt-[-10px]">
                            Discover the datasets other search engines cannot
                            reach
                        </p>
                    </span>
                    {/* <div className="mt-6 mx-auto w-full max-w-[575px]"> */}
                        {/* <SearchBar
                            onChange={(type: string, option: any) => {
                                if (!option) return;
                                const searchType =
                                    type === "dataset" ? "" : type;

                                router.push({
                                    pathname: `/search/${searchType}`,
                                    query: { q: option.value },
                                });
                            }}
                            selectClasses="border border-dtech-main-dark !bg-transparent h-15"
                        /> */}
                        <SearchBar
                            className="h-15 w-full mt-6"
                            onChange={(searchType, searchOption) => {
                                const searchTypeQ =
                                    searchType === "dataset" ? "" : searchType;
                                router.push({
                                    pathname: `/search/${searchTypeQ}`,
                                    query: { q: searchOption.value },
                                });
                            }}
                        />
                    {/* </div> */}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
