import React from "react";
import { useRef, useEffect } from "react";
import { X } from "react-feather";

const Modal = (props) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (props.open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [props.open]);

  return (
    <dialog 
      ref={dialogRef} 
      className="fixed inset-0 m-auto bg-white p-4 rounded-lg shadow-lg w-[600px] h-[800px] overflow-auto"
    >
      <div
        onClick={() => props.setOpen(false)}
        className="cursor-pointer"
      >
        <X color="#082d0f" size={40} />
      </div>
      {props.children}
    </dialog>
  );
};

export default Modal;
