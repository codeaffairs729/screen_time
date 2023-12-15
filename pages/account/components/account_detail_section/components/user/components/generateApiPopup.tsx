import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { UserTabPanelVMContext } from "pages/account/components/account_detail_section/components/user/user_tab_panel.vm";
import TextField from "components/UI/form/text_field";
import PrimaryBtn from "components/UI/form/primary_btn";
import Loader from "components/UI/loader";

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
        var options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
        var formattedDate = timestamp.toLocaleDateString('en-US', options);

        // Return the formatted date
        return formattedDate;
    }
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
                                    className="w-[751px] transform overflow-hidden border-[2px] border-dtech-light-teal rounded-[10px] bg-white sm:p-14 p-6 text-left align-middle shadow-xl transition-all"
                                >
                                    {UserTabPanelVM.apiKeys.length > 0 &&<div className="mt-2">
                                        <p className="sm:text-lg text-justify font-normal text-[#2D2D32]">
                                            Your API keys are listed below.
                                            
                                        </p>
                                    </div>}
                                    {UserTabPanelVM.isFetchingApiKeys
                                        ? <Loader /> : UserTabPanelVM.apiKeys.length > 0 && (
                                            <div className="mt-8 sm:overflow-x-hidden overflow-x-scroll">
                                                <table
                                                    className=" w-full h-full "
                                                >
                                                    <thead className="">
                                                        <tr className="">
                                                            <th className="sm:w-[32%] p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm w-1/2 text-left  pb-4 min-w-[130px]">
                                                                Name
                                                            </th>
                                                            <th className="sm:w-[17%] p-2 text-xs sm:text-sm min-w-[130px] text-center pb-4">
                                                                Created
                                                            </th>
                                                            <th className="sm:w-[17%] p-2 text-xs sm:text-sm text-center pb-4">
                                                                Last Used
                                                            </th>
                                                            <th className="sm:w-[17%] p-2 text-xs sm:text-sm text-center pb-4">
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=" sm:border-t-[1px] border-black">
                                                        {UserTabPanelVM.apiKeys?.map(
                                                            (item: any, index: any) => (
                                                                <tr
                                                                    className=" border-b-[1px] h-14 hover:bg-dtech-light-grey"
                                                                    key={index}
                                                                >
                                                                    <td className="underline  p-2 text-xs border-r-[1px] sm:border-r-0 sm:text-sm w-1/2 min-w-[120px] sm:w-[32%] ">

                                                                        {item.name}
                                                                    </td>
                                                                    <td className="sm:w-[17%] p-2 text-xs sm:text-sm min-w-[100px] text-center">
                                                                        {formatTimestamp(item.created_at)}
                                                                    </td>
                                                                    <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">
                                                                        {item.created_at == item.updated_at ? "" : formatTimestamp(item.updated_at)}
                                                                    </td>
                                                                    <td className="sm:w-[17%] p-2 text-xs sm:text-sm text-center">
                                                                        <div className="flex items-center justify-center" key={index}> <button onClick={() => { handleDeleteClick(item.key_id) }} className="h-6 w-6"> <img src="/images/deletebtn.svg" alt="delbtn" height={24} width={24}/> </button> <p className="text-dtech-light-grey3 ml-2"> Delete </p> </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                    <div className="sm:my-20 my-10 flex sm:flex-row flex-col items-center  justify-between space-x-4">
                                        <TextField
                                            className="!border-2 sm:!w-[380px] rounded-lg w-[280px] h-min"
                                            formControl={{
                                                control: UserTabPanelVM.apiForm.control,
                                                name: "name",
                                                rules: {
                                                    required: "Name is required",
                                                    validate: (value: any) => value.trim().length > 0 || 'Name cannot be empty',

                                                },
                                            }}
                                            placeholder="Enter a unique name for your new key"
                                            textfieldClassName="border-0 text-lg  border-[#C3C3C3] focus:ring-opacity-0 rounded-none "
                                        />
                                        <PrimaryBtn
                                            className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-[120px] sm:w-[170px] sm:!p-4 !p-2 rounded-[30px] sm:mt-0 mt-3  text-xs sm:text-[16px]"
                                            label="Generate API key"
                                            isLoading={UserTabPanelVM.isCreatingApiKeys}
                                            onClick={() => {
                                                UserTabPanelVM.apiForm.handleSubmit((data: any) => {
                                                    if (UserTabPanelVM.apiForm.getValues().name) {
                                                        UserTabPanelVM.createApiKeys(data);
                                                    }
                                                })();
                                            }}
                                        />
                                    </div>

                                    {UserTabPanelVM.isApiCreated && !UserTabPanelVM.isFetchingApiKeys && (
                                        <div className=" flex flex-col sm:space-y-8 space-y-2">
                                            <div className="flex space-x-2 sm:text-lg  font-bold sm:my-4 sm:mt-0 text-[#2D2D32]">
                                                <h1 className="text-dtech-new-main-light sm:mb-8 mb-2 break-words w-[80%]">
                                                    {UserTabPanelVM.createdApiKey.key}
                                                </h1>

                                                <div className="flex flex-col sm:flex-row">
                                                    <img
                                                        src="/images/icons/copy.svg"
                                                        alt="copy"
                                                        className="sm:ml-10 cursor-pointer h-5"
                                                        onClick={
                                                            handleCopyClick
                                                        }
                                                    />
                                                    <p className="text-dtech-light-grey3 sm:ml-2">
                                                        Copy
                                                    </p>
                                                </div>
                                            </div>

                                            <h1 className="sm:text-lg sm:mt-0 text-[#2D2D32]">
                                                Please save this secret key somewhere safe and accessible. For security reasons, you won&nbsp;t be able to view it again through your account. If you lose this secret key, you&nbsp;ll need to generate a new one.
                                            </h1>
                                            <h1 className="sm:text-lg sm:mt-0 text-[#2D2D32]">
                                            Safeguarding your API key is crucial for data security. Share it only when necessary and ensure secure transmission. Avoid embedding or storing it publicly in code repositories.
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
