import { Dialog, Transition } from "@headlessui/react";
import PrimaryBtn from "components/UI/form/primary_btn";
import { Fragment, useContext, useState } from "react";
import UserTabPanelVM, {
    UserTabPanelVMContext,
} from "pages/account/components/account_detail_section/components/user/user_tab_panel.vm";

type HandleDeletePopup = () => void;
const DeletePopup = ({
    handleDeletePopup,
}: {
    handleDeletePopup: HandleDeletePopup;
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const vm = UserTabPanelVM();

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
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
                        <div className="fixed inset-0 bg-black/25 " />
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
                                <div className="w-[410px] transform overflow-hidden border-[2px] border-dtech-light-teal rounded-[10px] bg-white sm:p-14 p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mt-2 text-black flex flex-col gap-4">
                                        <p className="">
                                            This action is irreversible and will
                                            result in the permanent loss of all
                                            your account data.
                                        </p>
                                        <p className="">
                                            Are you sure you want to delete your
                                            account? If yes, we will send you an
                                            email for verification.
                                        </p>
                                    </div>
                                    <div className="sm:mt-8 mt-4 flex gap-4 justify-evenly">
                                        <PrimaryBtn
                                            className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-[120px] sm:w-[170px] sm:!p-4 !p-2 rounded-[30px] sm:mt-0 mt-3  text-xs sm:text-[16px]"
                                            label="Yes"
                                            isLoading={vm.isDeletingUser}
                                            onClick={vm.deleteUser}
                                        />
                                        <PrimaryBtn
                                            className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white w-[120px] sm:w-[170px] sm:!p-4 !p-2 rounded-[30px] sm:mt-0 mt-3  text-xs sm:text-[16px]"
                                            label="No"
                                            onClick={handleDeletePopup}
                                        />
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

export default DeletePopup;
