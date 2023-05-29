import { useState,useEffect } from "react";
import "./SearchBar.css"
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const remote = "https://myproject-382821.uc.r.appspot.com/";
  const local = "http://localhost:8081/";
  var uri = remote;


  const get = async () => {
    const response = await fetch(uri);
    const json = await response.json();
    return json.result;
  };
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    get().then((data) => {
      setData(data);
    });
  }, [data]);

  return (
    <div className="search">
      <input
        className="input"
        type="search"
        placeholder="Search here" 
        onChange={handleChange}
        value={searchInput}
      />

      <table className="table">
        <tbody>
        <div>
        {data.map((board) => (
          <tr className="">
            <td>{board.card.map((card) =>(
              <div className="item">{(card.title.match(new RegExp(searchInput, "i")) && searchInput != '') && card.title}</div>
            ))}</td>
          </tr>

        ))}
        </div>
        
        </tbody>
      </table>
    </div>
  );
};

export default SearchBar;
