import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Rating } from 'react-simple-star-rating'

import "./Card.css";
import CardDetails from "./CardDetails/CardDetails";

const Card = (props) => {
  const [ratingValue, setRatingValue] = useState(0)
  const getItemStyle = (draggableStyle) => ({
    ...draggableStyle,
  });

  const [dropdown, setDropdown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  // useEffect(() =>{

  //     console.log(props.img_url)

  // })
  const handleRating = (rate) => {
    setRatingValue(rate)
  }
  return (
    <Draggable
      key={props.id?.toString()}
      draggableId={props.id?.toString()}
      index={props.index}
    >
      {(provided, snapshot) => (
        <>
          {modalShow && (
            <CardDetails
              updateCard={props.updateCard}
              onClose={setModalShow}
              card={props.card}
              bid={props.bid}
              removeCard={props.removeCard}
            />
          )}

          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={props.cn}
            style={getItemStyle(provided.draggableProps.style)}
            onClick={() => {
              setModalShow(true);
            }}
          >
            <div className="image">
              <img src={props.img_url} alt="" />
            </div>

            <div className="text-container">
              {props.title}
              <div className="author-container">
                <i>{props.author}</i>
                <div className="stars">
                   <Rating onClick={handleRating} initialValue='4' size= '13px' fillColor={props.cardColor} emptyColor='#f2f2f3'/>
                </div>
              </div>
            </div>
            
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
