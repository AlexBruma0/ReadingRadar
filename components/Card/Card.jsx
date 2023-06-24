import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Calendar, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
import Tag from "../Tags/Tag";
import "./Card.css";
import CardDetails from "./CardDetails/CardDetails";

const Card = (props) => {
  const getItemStyle = (draggableStyle) => ({
    ...draggableStyle,
  });

  const [dropdown, setDropdown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  // useEffect(() =>{

  //     console.log(props.img_url)

  // })
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
              </div>
            </div>
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
