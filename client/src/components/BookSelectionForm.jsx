import React, { useEffect, useState, useContext, useRef } from "react";
import Card from "./Card";

const BookSelectionForm = ({ books, onSelect }) => {
  return (
    <>
      {books && books.length > 0 ? (
        <div>
          {books.map((book) => (
            <div key={book.id} onClick={() => onSelect(book)}>
              <Card book={book} disableOnClick="true" />
            </div>
          ))}
        </div>
      ) : (
        <div>
          No results found, try searching for something different or click next
          to enter it in manually{" "}
        </div>
      )}
    </>
  );
};

export default BookSelectionForm;
