import { useEffect, useState } from "react";
import Modal from "./Modal";
import Card from "./Card";
export default function SearchBar(props) {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState(null);
  const uri = "https://myproject-382821.uc.r.appspot.com/";

  const getBoards = async () => {
    const response = await fetch(uri);
    const json = await response.json();
    return json.result;
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    getBoards().then((books) => {
      setBooks([...books[0].card, ...books[1].card, ...books[2].card]);
    });
  });

  return (
    <Modal
      open={props.open}
      setOpen={props.setOpen}
      dialog_class_name="almost-full-width relative full-height top-8 border-radius"
      search="true"
    >
      <input
        placeholder="🔎 Search for book"
        type="text"
        onChange={handleChange}
        className="margin-top"
      />
      <div className="margin-top">
        {books &&
          books.map((book) => (
            <>
              {book.title.toLowerCase().includes(input.toLowerCase()) ? (
                <Card
                  title={book.title}
                  author={book.author}
                  myRating={book.myRating}
                  img_url={book.img_url}
                  notes={book.notes}
                  id={props.id}
                />
              ) : (
                <></>
              )}
            </>
          ))}
      </div>
    </Modal>
  );
}