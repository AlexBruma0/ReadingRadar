import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Rating } from 'react-simple-star-rating'
import CardDetails from "./CardDetails";

const Card = (props) => {
  const getItemStyle = (draggableStyle) => ({
    ...draggableStyle,
  });

  const [modalShow, setModalShow] = useState(false);


  return (
    <Draggable
      key={props.id?.toString()}
      draggableId={props.id?.toString()}
      index={props.index}
    >
      {(provided) => (
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
            //className={props.cn}
            className="small-container"
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
                   <Rating  readonly='true' initialValue={props.card.myRating} allowFraction='true' size= '13px' fillColor={props.cardColor} emptyColor='#f2f2f3'/>
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
