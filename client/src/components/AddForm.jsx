import React, { useEffect, useState, useContext, useRef } from "react";
import { v4 as uuid, v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { Form, Field } from "react-final-form";
import { createBook, createBookAPI } from "../redux/slices/BooksSlice";
import ReactStars from "react-rating-stars-component";
import Select from 'react-select';
import { selectBoardNames } from "../redux/slices/BooksSlice";

const AddForm = ({ category, initialValues, handleSubmitForm }) => {
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const dispatch = useDispatch();
  const bookFields = {
    title: initialValues.title,
    author: initialValues.author,
    img_url: initialValues.img_url,
    rating: initialValues.rating,
    notes: initialValues.notes,
  };

  const categories = useSelector(selectBoardNames);


  const onSubmit = async (values, form) => {
    console.log(values);
    handleSubmitForm(values);
    // form.reset();
  };

  const feildMap = {
    title: "Title",
    author: "Author",
    img_url: "Image URL",
    rating: "Rating",
    notes: "Notes",
  };
  const onRatingChange = (newRating, form) => {
    form.change("rating", newRating);
  };

  return (
    <Form
      initialValues={bookFields}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="m-4">
          {["title", "author", "img_url", "notes"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 capitalize">
                {feildMap[field]}
              </label>
              <Field
                name={field}
                component={field === "notes" ? "textarea" : "input"}
                type="text"
                placeholder={"Enter " + feildMap[field]}
                className="w-full p-2 border border-gray-300 rounded outline-none focus:bg-slate-100"
              />
              {field === "img_url" && form.getState().values["img_url"] && (
                <img
                  src={form.getState().values["img_url"]}
                  alt="Preview"
                  className="mt-2 w-16 h-20 rounded-md "
                />
              )}
            </div>
          ))}
          {(category === "read" || category === "Read") && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 capitalize">
                Overall Rating
              </label>
              <ReactStars
                isHalf={true}
                value={initialValues.rating}
                count={5}
                onChange={(newRating) => onRatingChange(newRating, form)}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          )}
          {category === null && (
            <div>
              <label>Categories</label>
              <Field name="categories">
                {({ input }) => (
                  <Select
                    {...input}
                    isMulti
                    onChange={(value) => input.onChange(value)}
                    onBlur={() => input.onBlur(input.value)}
                    options={categories.map((category) => ({ label: category, value: category }))}
                  />
                )}
              </Field>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={submitting}
              style={{ backgroundColor: currentThemeColors.primary }}
              className="px-4 py-2 rounded border font-bold"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting}
              className="px-4 py-2 bg-gray-200 text-black rounded"
            >
              Reset
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default AddForm;
