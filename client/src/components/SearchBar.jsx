import { useEffect, useState } from "react";
import Modal from "./Modal";
import Card from "./Card";
export default function SearchBar(props) {


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
                  rating={book.rating}
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
