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
      <dialog ref={dialogRef} className={props.className}>
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

        <div style={{ opacity: 100 }}>{props.children}</div>
      </dialog>
    </>
  );
};

export default Modal;
