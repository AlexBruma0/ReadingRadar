import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { fetchAmazonBooks } from "../redux/slices/BooksSlice";
import { useDispatch } from 'react-redux'
import Card from "./Card";

export default function Form(props) {
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("")
  const [fetching, setFetching] = useState(false);
  const [externalData, setExternalData] = useState();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const handleSearchChange = (event) =>{
    setSearch(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (props.handleUpdate) await props.handleUpdate(data);
    if (props.refresh) {
      location.reload()};
    if (props.toggleOpen) props.toggleOpen();
  };

  const handleFetch = async () => {
    setFetching(true);
    const response = await dispatch(fetchAmazonBooks(search));
    setExternalData(response.payload);
    setFetching(false);
  };

  const handleRadioChange = (event) => {
    const author = event.target.value;
    const selectedBook = externalData.find(book => book.author === author);
    setData({
      ...data,
      title: selectedBook.title,
      author: selectedBook.author,
      img_url: selectedBook.img_url,
    });
    setExternalData(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fetching ? (
          <div className="center-text">
            <div className="large-text">Searching...</div>
            <SpinnerCircular color="pink" size="30vh" />
          </div>
        ) : (
          <div>
            {props.search && (
              <div>
                <div>Search</div>
                <input
                className="margin-bottom"
                type="text"
                key={"search"}
                name={"search"}
                placeholder="search for book, eg: The Legacy by Elle Kennedy"
                value={search}
                onChange={handleSearchChange}/>
                <button 
                onClick={handleFetch}>Search</button>
              </div>
            )}
            {externalData && externalData.length > 0 && (
              <div>
                {externalData.map((book, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      value={book.author}
                      onChange={handleRadioChange}
                    />
                  <Card
                    book={book}
                    navigate={'false'}
                  />
                  </label>
                  
                ))}
              </div>
            )}
            {Object.keys(data).map((key) => (
              <div>
                <div>{key == "id" ? "" : key}</div>
                {key == "notes" ? (
                  <textarea
                    key={key}
                    type="text"
                    rows={10}
                    cols={50}
                    name={key}
                    value={data[key]}
                    onChange={handleChange}
                  ></textarea>
                ) : key == "id" ? (
                  <></>
                ) : (
                  <input
                    type="text"
                    key={key}
                    name={key}
                    value={data[key]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          <button
            type="submit"
          >
            Submit
          </button>
          </div>
        )}

      </form>
    </>
  );
}
