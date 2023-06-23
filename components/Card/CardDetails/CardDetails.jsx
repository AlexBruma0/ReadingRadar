import React, { useState, useEffect } from "react";
import {
  Trash,
} from "react-feather";
import Modal from "../../Modal/Modal";
import "./CardDetails.css";

export default function CardDetails(props) {
  const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0"];

  const [values, setValues] = useState({ ...props.card });
  const [input, setInput] = useState(false);
  const [text, setText] = useState(values.title);
  const Input = (props) => {
    return (
      <div className="input">
        <input
          autoFocus
          defaultValue={text}
          type={"text"}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    );
  };
  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };


  const handelClickListner = (e) => {
    if (e.code === "Enter") {
      setInput(false);
      updateTitle(text === "" ? values.title : text);
    } else return;
  };

  useEffect(() => {
    document.addEventListener("keypress", handelClickListner);
    return () => {
      document.removeEventListener("keypress", handelClickListner);
    };
  });
  useEffect(() => {
    console.log(props.bid, values.id, values)
    props.updateCard(props.bid, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <div className="modal-container">
        <div className="title">
          {input ? (
                <Input title={values.title} />
              ) : (
                <h5
                  onClick={() => setInput(true)}
                >
                  {values.title}
                </h5>
              )}
          </div>
          <img src={values.img_url} alt="" />
          <button onClick={() => props.removeCard(props.bid, values.id)}>
            <span className="icon__sm">
              <Trash />
            </span>
            Delete Book
          </button>
      </div>
    </Modal>
  );
}
