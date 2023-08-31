import React from "react";
import { useRef, useEffect, useState } from "react";
import { X } from "react-feather";
const Modal = (props) => {
  const dialogRef = useRef(null);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      props.setOpen(false);
    }
  });

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
      <dialog ref={dialogRef} className={props.dialog_class_name}>
        {props.search ? (
          <></>
        ) : (
          <div className="space-between margin-bottom">
            <h2 className="underline">{props.formTitle}</h2>
            <div
              className="margin border-radius cursor-pointer "
              onClick={() => props.setOpen(false)}
            >
              {" "}
              <X color="#082d0f" size={40} />
            </div>
          </div>
        )}
        {props.search ? (
          <div className="height-0">
            <div className={props.search ? "sticky almost-full-width" : ""}>
              {props.children}
            </div>
          </div>
        ) : (
          <div>{props.children}</div>
        )}
      </dialog>
    </>
  );
};

export default Modal;
