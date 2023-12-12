import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import PrimaryBtn from "./form/primary_btn";
import { UserTabPanelVMContext } from "pages/account/components/account_detail_section/components/user/user_tab_panel.vm";
import Loader from "./loader";
import Table from "pages/organisation/components/table";
import TextField from "./form/text_field";

const GenerateApi = () => {
    const UserTabPanelVM = useContext(UserTabPanelVMContext)
   
    function closeModal() {
        UserTabPanelVM.setApiPopup(false);
        UserTabPanelVM.setIsApiCreated(false);
    }

    const handleCopyClick = () => {
        // Create a textarea element and set its value to the citation text
        const textArea = document.createElement("textarea");
        textArea.value = UserTabPanelVM.createdApiKey.key;

        // Append the textarea to the document
        document.body.appendChild(textArea);

        // Select the text inside the textarea
        textArea.select();

        // Copy the selected text to the clipboard
        document.execCommand("copy");

        // Remove the textarea from the document
        document.body.removeChild(textArea);

        // Provide some visual feedback to the user (optional)
        alert("Api key is copied");
    };
    const handleDeleteClick = (id: number) => {
        UserTabPanelVM.deleteApiKeys(id)
    };
    function formatTimestamp(timestampStr: string) {
        // Parse the original timestamp string
        var timestamp = new Date(timestampStr);
        var options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        var formattedDate = timestamp.toLocaleDateString('en-US', options);

        // Return the formatted date
        return formattedDate;
    }

    const tableData = UserTabPanelVM.apiKeys?.map((item: any, index: any) => [item.name, formatTimestamp(item.created_at), item.created_at == item.updated_at ? "Never" : formatTimestamp(item.updated_at), <div className="flex" key={ index}> <button onClick={() => { handleDeleteClick(item.key_id) }}> <img src="/images/deletebtn.svg" alt="delbtn" height={24} width={24} /> </button> <p className="text-dtech-light-grey3 ml-2"> Delete </p> </div>])
    const TABLE_HEADERS = ["NAME", "CREATED", "LAST USED"]
    return (
        <>
            <Transition appear show={UserTabPanelVM.apiPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div
                                    className="w-[751px] transform overflow-hidden border-[2px] border-dtech-light-teal rounded-[10px] bg-white p-14 text-left align-middle shadow-xl transition-all"
                                >
                                    <div className="mt-2">
                                        <p className="text-19 font-normal text-[#2D2D32]">
                                            Your API keys are listed below.
                                            Please note that we do not display
                                            your secret API keys again after you
                                            generate them.
                                        </p>
                                        <p className="text-19 font-normal text-[#2D2D32] mt-3">
                                            Protecting your API key is important
                                            to ensure the security of your data.
                                            Never share your API key with anyone
                                            unless absolutely necessary, and
                                            make sure to transmit it securely
                                            when required. Avoid hardcoding your
                                            API key into your code or storing it
                                            in public repositories
                                        </p>
                                    </div>

                                    {UserTabPanelVM.isFetchingApiKeys
                                        ? <Loader /> : UserTabPanelVM.apiKeys.length > 0 && (
                                            <div>
                                                
                                                <Table
                                                    tableHeaders={TABLE_HEADERS}
                                                    tableData={tableData}
                                                    headerClass="sm:text-[17px] !py-2 sm:!py-4 !text-xs border-2 border-white sm:!px-10 !px-4  !text-white text-center sm:font-medium sm:bg-dtech-new-main-light bg-dtech-dark-teal "
                                                    tableClass=" text-sm border-white  !px-10 text-white text-center sm:font-medium bg-[#EBEBEB]"
                                                    cellPadding={20}
                                                    tableRow="sm:text-[17px] text-black font-normal py-2 sm:!py-4  sm:!px-10 !px-4  border-2 border-white"
                                                />
                                            </div>
                                        )}

                                    <div className="mt-10 flex sm:flex-row flex-col items-center  justify-between space-x-4">
                                        {/* <FormRow
                                            label="Name"
                                            className=" md:w-auto bg-white flex-row w-min sm:!mb-8"
                                            labelClass="sm:text-[19px]"
                                            iconClass="sm:h-[19px] sm:w-[19px] text-black"
                                        > */}
                                        {/* <div>
                                            Name
                                        </div> */}
                                            <TextField
                                                className="bg-gray-50  !w-[280px] sm:w-[170px] h-min"
                                                formControl={{
                                                    control: UserTabPanelVM.apiForm.control,
                                                    name: "name",
                                                    rules: {
                                                        required: "Name is required",
                                                        validate: (value:any) => value.trim().length > 0 || 'Name cannot be empty',

                                                    },
                                                }}
                                                placeholder="Secret Key"
                                                textfieldClassName="border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none sm:text-[19px]"
                                            />
                                        <PrimaryBtn
                                            className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-[120px] sm:w-[170px] !p-[10px] sm:!p-[16px] rounded-[30px] sm:mt-0 mt-3  text-xs sm:text-[16px]"
                                            label="Generate API key"
                                            isLoading={UserTabPanelVM.isCreatingApiKeys}
                                            onClick={() => {
                                                UserTabPanelVM.apiForm.handleSubmit((data:any) => {
                                                    if (UserTabPanelVM.apiForm.getValues().name) {
                                                        UserTabPanelVM.createApiKeys(data);
                                                    }
                                                })();
                                            }}
                                        />
                                        {/* </FormRow> */}
                                    </div>

                                    {UserTabPanelVM.isApiCreated && !UserTabPanelVM.isFetchingApiKeys && (
                                        <div className=" mt-8">
                                            <div className="flex space-x-2">
                                                <h1 className="text-dtech-new-main-light">
                                                    {UserTabPanelVM.createdApiKey.key}
                                                </h1>

                                                <div className="flex">
                                                    <img
                                                        src="/images/icons/copy.svg"
                                                        alt="copy"
                                                        className="ml-10 cursor-pointer"
                                                        onClick={
                                                            handleCopyClick
                                                        }
                                                    />
                                                    <p className="text-dtech-light-grey3 ml-2">
                                                        Copy
                                                    </p>
                                                </div>
                                            </div>

                                            <h1>
                                                Please save this secret key
                                                somewhere safe and accessible.
                                                For security reasons, you won&apos;t
                                                be able to view it again through
                                                your account. If you lose this
                                                secret key, you&apos;ll need to
                                                generate a new one.
                                            </h1>
                                        </div>
                                    )}

                                    <div className="top-2 right-5 absolute ">
                                        <button
                                            className="text-black"
                                            onClick={
                                                closeModal
                                            }
                                        >
                                            <img
                                                src="/images/crosslogo.png"
                                                alt="crosslogo"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
export default GenerateApi;
