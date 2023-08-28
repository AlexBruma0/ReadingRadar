import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Rating } from "react-simple-star-rating";
import { MessageCircle, Edit } from "react-feather";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Form from "../components/Form";
function Book() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const book = location.state?.card;

  return (
    <>
      <Navbar></Navbar>
      <div className="large-container" style={{ maxHeight: 100000 }}>
        <h1 className="underline center-text">
          {book.title} -- <i>{book.author}</i>
        </h1>
        <div className="grid-container--large ">
          <div className=" border-radius">
            <div>
              <h1>
                <span style={{ fontSize: 100 }}>{book.rating}</span> / 5
              </h1>
            </div>
            <Rating
              readonly="true"
              allowFraction="true"
              initialValue={book.rating}
              size="50px"
              fillColor="var(--secondary-color)"
              emptyColor="#f2f2f3"
            />
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Felis lectus
              per ipsum efficitur sodales donec aptent feugiat nostra. Sociosqu
              ridiculus nisl lobortis integer metus neque ipsum. Lobortis
              habitant dignissim dictum lacus pellentesque eget euismod at.
              Rutrum nisi lobortis natoque commodo dis dui facilisis aenean.
              Ornare a iaculis scelerisque fringilla mi dui. Vivamus per
              habitant integer conubia hendrerit finibus nec; quam tellus.
              Pharetra interdum consectetur proin natoque volutpat sollicitudin
              lacus magna. Vehicula montes ullamcorper montes euismod vel
              posuere gravida ut nunc. Primis vel taciti litora ipsum semper
              elit. Fusce iaculis quam turpis dapibus ipsum. Dolor mattis
              adipiscing potenti nibh ultrices efficitur quam! Lorem dolor fusce
              senectus; porta congue ac tortor dui scelerisque. Cursus maximus
              leo facilisis scelerisque convallis. Pretium aenean in tellus
            </p>
          </div>
          <div className=" padding center-text">
            <img src={book.cover_img} className="large-img" alt="" />
          </div>
        </div>
      </div>
      <div className="flexbox">
        <button
          className="large-text full-width border-radius primary-backround-color"
          style={{ marginTop: 20 }}
        >
          <MessageCircle></MessageCircle> <i>Comment</i>
        </button>
        <button
          className="large-text full-width border-radius primary-backround-color"
          style={{ marginTop: 20 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Edit></Edit> <i>Edit</i>
        </button>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <Form
          data={[
            { key: "title", value: book.title },
            { key: "author", value: book.author },
            { key: "rating", value: book.rating },
            { key: "notes", value: book.notes },
            { key: "Cover image url", value: book.cover_img },
          ]}
        />
      </Modal>
    </>
  );
}
export default Book;
