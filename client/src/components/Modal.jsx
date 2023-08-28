import React from "react";
import { useRef, useEffect, useState } from "react";
import Form from "./Form";

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
        {props.children}
        <button onClick={() => props.setOpen(false)}>close</button>
      </dialog>
    </>
  );
};

export default Modal;
