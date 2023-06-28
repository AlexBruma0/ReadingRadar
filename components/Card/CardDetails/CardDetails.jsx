import React, { useState, useEffect } from "react";
import { Rating } from 'react-simple-star-rating'
import { Trash } from "react-feather"
import Modal from "../../Modal/Modal";
import "./CardDetails.css";

export default function CardDetails(props) {
  const [values, setValues] = useState({ ...props.card });
  const [ratingValue, setRatingValue] = useState(0)
  const [input, setInput] = useState(false);
  const [notes, setNotes] = useState(values.notes)
  const [title, setTitle] = useState(values.title);
  const [author_input, setAuthor_input] = useState(false);
  const [author, setAuthor] = useState(values.author);
  const [rating_input, setRating_input] = useState(false);
  const [rating, setRating] = useState(values.myRating);

  const Input = (props) => {
    return (
      <div
        className={
          props.title === true ? "title-input-wrapper" : "author-input-wrapper"
        }
      >
        <input
          className={props.title === true ? "title-input" : "author-input"}
          autoFocus
          defaultValue={
            props.title === true
              ? title
              : props.rating === true
              ? rating
              : author
          }
          type={"text"}
          onChange={(e) => {
            props.title === true
              ? setTitle(e.target.value)
              : props.rating === true
              ? setRating(e.target.value)
              : setAuthor(e.target.value);
          }}
        />
      </div>
    );
  };
  const updateTitle = (value) => {
    const temp = values;
    values.title = value;
    setValues(temp);
  };
  const updateAuthor = (value) => {
    const temp = values;
    values.author = value;
    setValues(temp);
  };
  const updateRating = (value) => {
    const temp = values;
    values.myRating = value;
    setValues(temp);
  };
  const updateNotes = (value) => {
    const temp = values;
    values.notes = value;
    setValues(temp);
  };

  const handelClickListner = (e) => {
    if (e.code === "Enter") {
      setInput(false);
      setAuthor_input(false);
      setRating_input(false);
      updateTitle(title === "" ? values.title : title);
      updateAuthor(author === "" ? values.author : author);
      updateRating(rating === "" ? values.myRating : rating);
      updateNotes(notes === "" ? values.notes : notes)
    } else return;
  };

  useEffect(() => {
    document.addEventListener("keypress", handelClickListner);
    return () => {
      document.removeEventListener("keypress", handelClickListner);
    };
  });
  useEffect(() => {
    props.updateCard(props.bid, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <div className="modal-container">
        <div>
          {input ? (
            <Input title={true} />
          ) : (
            <div className="modal-title" onClick={() => setInput(true)}>
              {values.title}
            </div>
          )}
        </div>

        <div className="model-content-container">
          <div className="col1-container">
            <img src={values.img_url} alt="" />
            
            <button onClick={() => props.removeCard(props.bid, values.id)}>
              <span className="icon__sm"></span>
              Delete Book
            </button>
          </div>

          <div className="col2-container">
            <div className="item">
              {author_input ? (
                <Input title={false} />
              ) : (
                <div className="item-item" onClick={() => setAuthor_input(true)}>
                  Author: <i>{values.author}</i>
                </div>
              )}
            </div>

            <div className="item">
              {rating_input ? (
                <Input rating={true} />
              ) : (
                <div className="item-item" >
                  <div className="stars">
                  My rating:{" "}<Rating onClick={updateRating} allowFraction='true' initialValue={values.myRating} size= '20px' fillColor='pink' emptyColor='#f2f2f3'/>
                </div>
                </div>
              )}
            </div>
            <div className="item-item" >
              Notes:
            </div>
            <textarea placeholder="click to add notes" name="notes" id="notes" cols="30" rows="8"
              onChange={(e) => {
                setNotes(e.target.value);
              }}  
              >
                {values.notes}
            </textarea>


          </div>
        </div>
      </div>
    </Modal>
  );
}
