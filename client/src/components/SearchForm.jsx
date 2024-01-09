import React, { useEffect, useState, useContext, useRef } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { Form, Field } from "react-final-form";

const SearchForm = ({ onSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const inputRef = useRef();

  const handleSubmit = (values) => {
    onSubmit(values.searchTerm);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="m-4">
          <div className="mb-4">
            <Field
              name="searchTerm"
              component="input"
              type="text"
              placeholder="Search for book."
              className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-black focus:border-black"
              ref={inputRef}
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: currentThemeColors.primary }}
            className="px-4 py-2 rounded border font-bold"
          >
            Search
          </button>
        </form>
      )}
    />
  );
};

export default SearchForm;
