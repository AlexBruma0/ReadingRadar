import { useState,useEffect } from "react";
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
    console.log(data)
  }, [data]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />

      <table>
        {data.map((board) => (
          
          <tr>
            <td>{board.card.map((card) =>(
              <div>{(card.title.match(new RegExp(searchInput, "i")) && searchInput != '') && card.title}</div>
            ))}</td>
          </tr>

        ))}
      </table>
    </div>
  );
};

export default SearchBar;
