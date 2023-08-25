import React, { useState } from "react";
import { Plus, X } from "react-feather";

const Editable = (props) => {
  const [show, setShow] = useState(props?.handler || false);
  const [text, setText] = useState(props.defaultValue || "");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (text && props.onSubmit) {
      setText("");
      props.onSubmit(text);
    }
    setShow(false);
  };

  return (
    <div className={`editable`}>
      {show ? (
        <form onSubmit={handleOnSubmit}>
          <div className={`editable__input ${props.class}`}>
            <textarea
              placeholder={props.placeholder}
              autoFocus
              id={"edit-input"}
              type={"text"}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="btn__control">
              <button className="add__btn" type="submit">
                {`${props.btnName}` || "Add"}
              </button>
              <X
                height="3.5vh"
                className="close"
                onClick={() => {
                  setShow(false);
                  props?.setHandler(false);
                }}
              />
            </div>
          </div>
        </form>
      ) : (
        <p
          className={props.board3}
          onClick={() => {
            setShow(true);
          }}
        >
          {props.defaultValue === undefined ? <Plus height="2vh" /> : <></>}
          {props?.name || "Add"}
        </p>
      )}
    </div>
  );
};

export default Editable;
