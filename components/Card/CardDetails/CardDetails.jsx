import React, { useState, useEffect } from "react";
import { Rating } from 'react-simple-star-rating'
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

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };
  const updateAuthor = (value) => {
    const temp = values;
    values.author = value;
    setValues(temp);
  };
  const updateRating = (value) => {
    setValues({...values, myRating:value})
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
    console.log(values)
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values]);

  useEffect(() => {
    document.addEventListener("keypress", handelClickListner);
    return () => {
      document.removeEventListener("keypress", handelClickListner);
    };
  });


  return (
    <Modal onClose={props.onClose}>
      <div className="modal-container">
        <div>
          {input ? (
              <input className="title-input" defaultValue= {props.card.title} type="text" name="" id="" onChange={(e) => {setValues({...values,title:e.target.value})}}/>
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
                <input className="author-input" defaultValue= {props.card.author} type="text" name="" id="" onChange={(e) => {setValues({...values,author:e.target.value})}}/>
              ) : (
                <div className="item-item" onClick={() => setAuthor_input(true)}>
                  Author: <i>{values.author}</i>
                </div>
              )}
            </div>

            <div className="item">
              {rating_input ? (
                <></>
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
                setValues({...values, notes:e.target.value})
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
