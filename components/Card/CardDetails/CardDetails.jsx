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
  const [author_input, setAuthor_input] = useState(false);
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
        <div >
          {input ? (
                <Input title={values.title} />
              ) : (
                <div
                  className="title"
                  onClick={() => setInput(true)}
                >
                  {values.title}
                </div>
              )}
          </div>

          <div className="model-content-container">

            <div className="col1-container">
              <img src={values.img_url} alt="" />
            </div>

            <div className="col2-container">
              <div className="item">
                {author_input ? (
                  <Input title={'hi'} />
                ) : (
                  <h5
                    onClick={() => setAuthor_input(true)}
                  >
                    {values.author}
                  </h5>
                )}
              </div>
              <button onClick={() => props.removeCard(props.bid, values.id)}>
                <span className="icon__sm">
                  <Trash />
                </span>
                Delete Book
              </button>
            </div>
          </div>
  

      </div>
    </Modal>
  );
}
