import React, { useState, useEffect } from "react";
import {
  Calendar,
  Check,
  CheckSquare,
  Clock,
  CreditCard,
  List,
  Plus,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
import Editable from "../../Editable/Editable";
import Modal from "../../Modal/Modal";
import "./CardDetails.css";
import { v4 as uuidv4 } from "uuid";
import Label from "../../Label/Label";

export default function CardDetails(props) {
  const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0"];

  const [values, setValues] = useState({ ...props.card });
  const [input, setInput] = useState(false);
  const [text, setText] = useState(values.title);
  const [labelShow, setLabelShow] = useState(false);
  const Input = (props) => {
    return (
      <div className="">
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
  const addTask = (value) => {
    values.task.push({
      id: uuidv4(),
      task: value,
      completed: false,
    });
    setValues({ ...values });
  };

  const removeTask = (id) => {
    const remaningTask = values.task.filter((item) => item.id !== id);
    setValues({ ...values, task: remaningTask });
  };

  const deleteAllTask = () => {
    setValues({
      ...values,
      task: [],
    });
  };

  const updateTask = (id) => {
    const taskIndex = values.task.findIndex((item) => item.id === id);
    values.task[taskIndex].completed = !values.task[taskIndex].completed;
    setValues({ ...values });
  };
  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const calculatePercent = () => {
    const totalTask = values.task.length;
    const completedTask = values.task.filter(
      (item) => item.completed === true
    ).length;

    return Math.floor((completedTask * 100) / totalTask) || 0;
  };

  const removeTag = (id) => {
    const tempTag = values.tags.filter((item) => item.id !== id);
    setValues({
      ...values,
      tags: tempTag,
    });
  };

  const addTag = (value, color) => {
    values.tags.push({
      id: uuidv4(),
      tagName: value,
      color: color,
    });

    setValues({ ...values });
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
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <div className="local__bootstrap">
        <div
          className="container"
          style={{ minWidth: "650px", position: "relative" }}
        >
          <div className="row pb-4">
            <div className="col-12">
              <div className="d-flex align-items-center pt-3 gap-2">
                <CreditCard className="icon__md" />
                {input ? (
                  <Input title={values.title} />
                ) : (
                  <h5
                    style={{ cursor: "pointer" }}
                    onClick={() => setInput(true)}
                  >
                    {values.title}
                  </h5>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <h6 className="text-justify">Label</h6>
              <div
                className="d-flex label__color flex-wrap"
                style={{ width: "500px", paddingRight: "10px" }}
              >
                {values.tags.length !== 0 ? (
                  values.tags.map((item) => (
                    <span
                      className="d-flex justify-content-between align-items-center gap-2"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.tagName.length > 10
                        ? item.tagName.slice(0, 6) + "..."
                        : item.tagName}
                      <X
                        onClick={() => removeTag(item.id)}
                        style={{ width: "15px", height: "15px" }}
                      />
                    </span>
                  ))
                ) : (
                  <span
                    style={{ color: "#ccc" }}
                    className="d-flex justify-content-between align-items-center gap-2"
                  >
                    <i> No Labels</i>
                  </span>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex card__action__btn flex-column gap-2">
                <button onClick={() => setLabelShow(true)}>
                  <span className="icon__sm">
                    <Tag />
                  </span>
                  Add Label
                </button>
                {labelShow && (
                  <Label
                    color={colors}
                    addTag={addTag}
                    tags={values.tags}
                    onClose={setLabelShow}
                  />
                )}

                <button onClick={() => props.removeCard(props.bid, values.id)}>
                  <span className="icon__sm">
                    <Trash />
                  </span>
                  Delete Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
