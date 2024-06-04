import CloseIcon from "@components/ui/icons/close";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

export default function Popup({ title, text, isOpen, close }) {
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-50 focus:outline-none"
          onClose={close}>
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]">
                <DialogPanel className="relative w-full text-center max-w-md rounded-xl bg-background p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-white">
                    {title}
                  </DialogTitle>
                  <p className="mt-2 text-sm text-gray-light">{text}</p>
                  <div className="mt-4 flex flex-row items-center justify-center gap-4 w-full">
                    <a
                      className="flex items-center justify-center w-10 h-10 bg-background-dark hover:bg-background-dark/70 rounded-full"
                      href="https://www.instagram.com/japodium/"
                      target="_blank"
                      rel="noopener">
                      <img
                        src="ig.svg"
                        alt="Facebook"
                        className="w-5 h-5 fill-primary"
                      />
                    </a>
                    <a
                      className="flex items-center justify-center w-10 h-10 bg-background-dark hover:bg-background-dark/70 rounded-full"
                      href="https://www.facebook.com/japodium/"
                      target="_blank"
                      rel="noopener">
                      <img src="fb.svg" alt="Twitter" className="w-5 h-5" />
                    </a>
                  </div>
                  <div className="mt-4">
                    <Button
                      className="absolute top-2 right-2 inline-flex items-center gap-2 rounded-full p-2 opacity-60 hover:opacity-100 outline-none focus:outline-none"
                      onClick={close}>
                      <CloseIcon className={"w-3 h-3"} />
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
