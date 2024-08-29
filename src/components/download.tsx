import React from "react";
// import { useState } from "react";
// import Popup from "./dialog/Popup.js";
import Appstore from "./ui/icons/appstore.jsx";
import Play from "./ui/icons/play.jsx";

export default function Download() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(false);

  // function open() {
  //   setIsOpen(true);
  //   setIsDisabled(true);
  // }

  // function close() {
  //   setIsOpen(false);
  // }
  return (
    <>
      <div className="flex-1 flex flex-col gap-8 justify-center max-w-xs static z-40">
        <a
          href="https://play.google.com/store/apps/details?id=japodium.android"
          target="_blank"
          className="bg-primary rounded-lg py-3 flex items-center justify-center border-0 hover:opacity-90 active:opacity-90"
          rel="noopener">
          <Play className={"max-h-[36px]"} />
        </a>
        <a
          href="https://apps.apple.com/in/app/japodium/id6615062017"
          target="_blank"
          // onClick={open}
          // href="#"
          className={`bg-primary rounded-lg py-3 flex items-center justify-center border-0 hover:opacity-90 active:opacity-90`}
          rel="noopener">
          <Appstore className={"max-h-[36px]"} />
        </a>
      </div>
      {/* <Popup
        isOpen={isOpen}
        close={close}
        title="Stay tuned!"
        text="Our app will soon be available on the App Store. Thank you for your interest. Follow us for the latest updates!"
      /> */}
    </>
  );
}
