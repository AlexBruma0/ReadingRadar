import React from "react";
import { useRef, useEffect } from "react";
import { X } from "react-feather";

const Modal = ({ closeDialog, children, isOpen }) => {
  return (
    <dialog
      open={isOpen}
      className="p-5 bg-white rounded-lg shadow-lg fixed inset-0 w-[600px] h-[735px] border-1 z-50"
    >
      <div className="flex flex-col h-full justify-between">
        <div onClick={closeDialog} className="cursor-pointer">
          <X color="#082d0f" size={40} />
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
