import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Rating } from "react-simple-star-rating";
import { MessageCircle, Edit, Trash } from "react-feather";
import { useState } from "react";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState(location.state?.card);
  const bid = location.state?.bid;
  const cid = location.state?.card.id;
  const uri = "http://localhost:8081/";

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

  const handleDelete = async (bid, cid) =>{
    console.log(bid,cid)
    try {
      await fetch(`${uri}${bid}`,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: cid
        }),

      })
    navigate("/")

    } catch (error) {
      console.log(error)
    }

  }

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Navbar />
      <div className="flexbox">
        <button
         
        >
          <MessageCircle></MessageCircle> <i></i>
        </button>
        <button
          
          onClick={toggleOpen}
        >
          <Edit></Edit> <i></i>
        </button>
        <button  onClick={() => {
          handleDelete(bid,cid)
          }}>
          <Trash></Trash> <i></i>
        </button>
      </div>
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
            <img src={book.img_url} className="large-img" alt="" />
          </div>
        </div>
      </div>
      
      <Modal open={open} setOpen={setOpen} formTitle="Edit book">
        <Form
          data={book}
          bid={bid}
          handleUpdate={updateCard}
          toggleOpen={toggleOpen}
        />
      </Modal>
    </>
  );
}
export default Book;
