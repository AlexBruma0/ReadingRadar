import React from "react";
import { useRef, useEffect } from "react";
import { X } from "react-feather";

const Modal = ({closeDialog, children}) => {
  const dialogRef = useRef(null);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto bg-white p-4 rounded-lg shadow-lg w-[600px] h-[700px] overflow-auto flex flex-col"
    >
      <div className="flex-grow">
        <div onClick={closeDialog} className="cursor-pointer">
          <X color="#082d0f" size={40} />
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
