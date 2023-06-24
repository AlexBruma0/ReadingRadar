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
  const [title, setTitle] = useState(values.title);
  const [author, setAuthor] = useState(values.author);
  const Input = (props) => {
    return (
      <div className={props.title === true? 'title-input-wrapper' : 'author-input-wrapper'}>
        <input
        className={props.title === true? 'title-input' : 'author-input'}
          autoFocus
          defaultValue={props.title === true? title : author}
          type={"text"}
          onChange={(e) => {
            props.title === true? setTitle(e.target.value) : setAuthor(e.target.value)
            
          }}
        />
      </div>
    );
  };
  const updateTitle = (value) => {
    console.log(value)
    const temp = values
    values.title = value
    setValues(temp);
    console.log(value)
  };
  const updateAuthor = (value) => {
    setValues({ ...values, author: value });
  };


  const handelClickListner = (e) => {
    if (e.code === "Enter") {
      console.log(title)
      setInput(false);
      setAuthor_input(false)
      updateTitle(title === "" ? values.title : title);
      updateAuthor(author === "" ? values.author : author);
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
                <Input title={true} />
              ) : (
                <div
                  className="modal-title"
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
                  <Input title={false} />
                ) : (
                  <div
                    onClick={() => setAuthor_input(true)}
                  >
                    Author: <i>{values.author}</i>
                  </div>
                )}
              </div>
              <div className="item">
                <div>
                Publication Date: <i>{values.publication_date}</i>
                </div>
            
              </div>
              {/* <div className="item">
                {author_input ? (
                  <Input title={false} />
                ) : (
                  <div
                    onClick={() => setAuthor_input(true)}
                  >
                    My rating: <i>{values.author}</i>
                  </div>
                )}
              </div> */}
              <div className="item">
                <div>
                Amazon rating: <i>{values.rating} </i>
                </div>
            
              </div>
              <div className="item">
                <div>
                Number of ratings: <i>{values.ratings_total} </i>
                </div>
            
              </div>
              <div className="item">
                <div>
                Number of Pages: <i>{values.numberOfPages} </i>
                </div>
            
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
