import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Rating } from "react-simple-star-rating";
import { MessageCircle, Edit, Trash } from "react-feather";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

export default function BookPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState(location.state?.card);
  const board_id = location.state?.bid;
  const cid = location.state?.card.id;
  var uri = "https://myproject-382821.uc.r.appspot.com/";
  const local = "http://localhost:8081/";
 // uri = local
  const updateCard = async (bid, card) => {
    setBook(card);
    const response = await fetch(uri);
    const json = await response.json();
    const boards = json.result;
    const bindex = boards.findIndex((board) => {
      return board._id == bid;
    });

    const cid = boards[bindex].card.findIndex((c) => {
      return c.id == card.id;
    });
    boards[bindex].card[cid] = card;
    await fetch(`${uri}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: bid,
        card: boards[bindex].card,
      }),
    });
  };

  const handleDelete = async (bid, cid) => {
    console.log(board_id, cid);
    try {
      await fetch(`${uri}${board_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: cid,
        }),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Navbar />

      <div className="large-container" style={{ maxHeight: 100000 }}>
        <h1 className="underline center-text">
          {book.title} -- <i>{book.author}</i>
        </h1>
        <div className="grid-container--large ">
          <div className=" border-radius">
            <div>
              <h1>
                <span style={{ fontSize: 100 }}>{book.myRating}</span> / 5
              </h1>
            </div>
            <Rating
              readonly="true"
              allowFraction="true"
              initialValue={book.myRating}
              size="50px"
              fillColor="var(--secondary-color)"
              emptyColor="#f2f2f3"
            />
            <p>{book.notes}</p>
          </div>
          <div className=" padding center-text">
            <img src={book.img_url} className="large-img" alt="" />
          </div>
        </div>
      </div>
      <div className="flexbox margin-top">
        <button className="full-width" onClick={toggleOpen}>
          <Edit></Edit> <i></i>
        </button>
        <button
          className="full-width"
          onClick={() => {
            handleDelete(board_id, cid);
          }}
        >
          <Trash></Trash> <i></i>
        </button>
      </div>

      <Modal open={open} setOpen={setOpen} formTitle="Edit book">
        <Form
          data={book}
          bid={board_id}
          handleUpdate={updateCard}
          toggleOpen={toggleOpen}
        />
      </Modal>
    </>
  );
}

