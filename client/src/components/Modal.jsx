import React from "react";
import { useRef, useEffect, useState } from "react";
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
        dialog
        <button onClick={() => props.setOpen(false)}>close</button>
      </dialog>
      <div style={{color:'white'}}>modal is open: {String(props.open)}</div>
    </>
  );
};

export default Modal;
