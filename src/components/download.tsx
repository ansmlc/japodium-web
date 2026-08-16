import React, { useState } from "react";
import Popup from "./dialog/Popup";
import Appstore from "./ui/icons/appstore.jsx";
import Play from "./ui/icons/play.jsx";

export default function Download() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="flex-1 flex flex-col gap-8 justify-center max-w-xs static z-40">
        <button
          type="button"
          onClick={open}
          className="bg-primary rounded-lg py-3 flex items-center justify-center border-0 hover:opacity-90 active:opacity-90"
          aria-label="Android app coming soon">
          <Play className={"max-h-[36px]"} />
        </button>
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
      <div className="mt-4 flex flex-row items-center justify-center gap-4 w-full z-40">
        <a
          className="flex items-center justify-center w-10 h-10 bg-background-dark hover:bg-background-dark/70 rounded-full"
          href="https://www.instagram.com/japodium/"
          target="_blank"
          rel="noopener">
          <img src="ig.svg" alt="Facebook" className="w-5 h-5 fill-primary" />
        </a>
        <a
          className="flex items-center justify-center w-10 h-10 bg-background-dark hover:bg-background-dark/70 rounded-full"
          href="https://www.facebook.com/japodium/"
          target="_blank"
          rel="noopener">
          <img src="fb.svg" alt="Twitter" className="w-5 h-5" />
        </a>
      </div>
      <Popup
        isOpen={isOpen}
        close={close}
        title="Coming soon"
        text="Our Android app will be available soon."
      />
    </>
  );
}
