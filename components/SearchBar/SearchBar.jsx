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
    
    return json.result[0].card.concat(json.result[1].card,json.result[2].card);
  };
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    get().then((data) => {
      setData(data)
      console.log(data)
      
    })
  }, [data]);

  return (
    <div className="search">
      <input
        className="input"
        type="search"
        placeholder="Search for book:" 
        onChange={handleChange}
        value={searchInput}
      />

      <table className="table">
        <tbody>
        {data.map((book) => (
          <tr>
            <td className="item">{(book.title.match(new RegExp(searchInput, "i")) && searchInput != '') && book.title}</td>
          </tr>
        ))}

        </tbody>
      </table>
    </div>
  );
};

export default SearchBar;
