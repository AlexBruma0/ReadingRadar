import React from "react";
import { useRef, useEffect } from "react";
import { X } from "react-feather";
import { SpinnerCircular } from "spinners-react";

const Modal = ({ closeDialog, children, isOpen, isLoading }) => {
  return (
    <dialog
      open={isOpen}
      className="p-5 bg-white rounded-lg shadow-lg fixed inset-0 w-full h-full max-w-2xl max-h-2xl border-1 z-50 overflow-auto"
    >
      <div className="flex flex-col h-full justify-between">
        <div onClick={closeDialog} className="cursor-pointer">
          <X color="#082d0f" size={40} />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <SpinnerCircular size={200} color="black" />{" "}
            {/* Adjust spinner size here */}
          </div>
        ) : (
          children
        )}
      </div>
    </dialog>
  );
};

export default Modal;
