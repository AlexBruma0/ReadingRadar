import { useState, useEffect } from "react";
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const remote = "https://myproject-382821.uc.r.appspot.com/";
  const local = "http://localhost:8081/";
  var uri = remote;

  const get = async () => {
    const response = await fetch(uri);
    const json = await response.json();

    return json.result[0].card.concat(json.result[1].card, json.result[2].card);
  };
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    get().then((data) => {
      setData(
        data.filter((book) => {
          return (
            book.title.match(new RegExp(searchInput, "i")) && searchInput != ""
          );
        })
      );
    });
  }, [data]);

  return (
    <div className="searchBar">
      <input
        className="searchBar-input"
        type="search"
        placeholder="Search for book:"
        onChange={handleChange}
        value={searchInput}
      />

      <div className="table">
        {data.map((book) => (
          <div className="item">{book.title}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
