import React from "react";
import { useRef, useEffect, useState } from "react";
import Form from "./Form";
import { X } from "react-feather";
const Modal = (props) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (props.open) {
      dialogRef.current?.showModal();
    }
    if (!props.open) {
      dialogRef.current?.close();
    }
  }, [props.open]);
  return (
    <>
      <dialog ref={dialogRef}>
        <div className="space-between">
          <h2 className="underline">{props.formTitle}</h2>
          <button
            className="margin border-radius secondary-backround-color"
            onClick={() => props.setOpen(false)}
          >
            {" "}
            <X />
          </button>
        </div>
        {props.children}
      </dialog>
    </>
  );
};

export default Modal;
