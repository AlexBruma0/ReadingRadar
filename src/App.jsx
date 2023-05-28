import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../components/Navbar/Navbar";
import Board from "../components/Board/Board";
// import data from '../data'
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Editable from "../components/Editable/Editable";
import useLocalStorage from "use-local-storage";
import "../bootstrap.css";
function App() {
  const remote = "https://myproject-382821.uc.r.appspot.com/";

const local = "http://localhost:8081/"
var uri = remote;
  const get = async () => {
    const response = await fetch(uri);
    const json = await response.json();
    return json.result;
  };
  const [data, setData] = useState([]);

  const defaultDark = window.matchMedia(
    "(prefers-colors-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  const dragCardInBoard = async(source, destination) => {
    let tempData = [...data];
    console.log(tempData)
    const destinationBoardIdx = tempData.findIndex(
      (item) => item._id.toString() === destination.droppableId
    );
    
    const sourceBoardIdx = tempData.findIndex(
      (item) => item._id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);
    return tempData;
  };

  const addCard = async(title, bid) => {
    await fetch(`${uri}${bid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card: {
          id: uuidv4(),
          title: title,
          tags: [],
          task: [],
        }

      }),
    });
  };

  const removeCard = async(boardId, cardId) => {
    await fetch(`${uri}${boardId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardId: cardId

      }),
    });
  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;
    dragCardInBoard(source, destination).then((data)=>{
      const sindex = data.findIndex((item) => item._id === source.droppableId);
      fetch(`${uri}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: source.droppableId,
          board: data[sindex]
        }),
      });
      const dindex = data.findIndex((item) => item._id === destination.droppableId);
      fetch(`${uri}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: destination.droppableId,
          board: data[dindex]
        }),
      });
      
    })
    // setData(dragCardInBoard(source, destination));
  };

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    setData(tempBoards);
  };

  useEffect(() => {
    get().then((data) =>{
      setData(data)
    })
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App" data-theme={theme}>
        <Navbar switchTheme={switchTheme} />
        <div className="app_outer">
          <div className="app_boards">
            {data.map((item) => (
              <Board
                key={item._id}
                id={item._id}
                name={item.boardName}
                card={item.card}
                setName={setName}
                addCard={addCard}
                removeCard={removeCard}
                removeBoard={removeBoard}
                updateCard={updateCard}
              />
            ))}
          
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
