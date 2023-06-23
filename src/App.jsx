import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../components/Navbar/Navbar";
import Board from "../components/Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "../bootstrap.css";
import { SpinnerCircular } from 'spinners-react';
function App() {
  const remote = "https://myproject-382821.uc.r.appspot.com/";

  const local = "http://localhost:8081/";
  const [loading, setLoading] = useState(true);
  const [waitingAPI0, setWaitingAPI0] = useState(false)
  const [waitingAPI1, setWaitingAPI1] = useState(false)
  const [waitingAPI2, setWaitingAPI2] = useState(false)
  const [localData, setlocalData] = useState(null)

  var uri = local;
  const get = async () => {
    const response = await fetch(uri);
    const json = await response.json();
    return json.result;
  };
  const [data, setData] = useState([]);

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  const dragCardInBoard = async (source, destination) => {
    let tempData = [...data];
    console.log(tempData);
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

  const addCard = async (title, bid) => {
    console.log(bid)
    await new Promise((resolve) =>{
        if(bid === '64711f3eb05f463a0ccfd027'){
          setWaitingAPI0(true)
          resolve(null)
        }
        if(bid === '64711f52b05f463a0ccfd028'){
          setWaitingAPI1(true)
          resolve(null)
        }
        if(bid === '647289ed971a4bc678762595'){
          setWaitingAPI2(true)
          resolve(null)
        }

    })
    await fetch(`${uri}${bid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card: {
          id: uuidv4(),
          title: title,
          tags: [],
          task: [],
        },
      }),
    });
    setWaitingAPI0(false)
    setWaitingAPI1(false)
    setWaitingAPI2(false)
  };

  const removeCard = async (boardId, cardId) => {
    await fetch(`${uri}${boardId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardId: cardId,
      }),
    });
  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };
  const reorder = async( index,startIndex, endIndex) => {
    const temp = data
    const [removed] = temp[index].card?.splice(startIndex, 1);
    temp[index].card?.splice(endIndex, 0, removed);
    console.log(temp)
    setlocalData(temp)

    await fetch(`${uri}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: temp[index]._id,
        card: temp[index].card,
      }),
    });
  };
  const move = async(sourceBoardIndex, destinationBoardIndex,sourceCardIndex, destinationCardIndex) => {
    const temp= data
    const [removed] = temp[sourceBoardIndex].card.splice(sourceCardIndex, 1);
    temp[destinationBoardIndex].card.splice(destinationCardIndex, 0, removed);
  
    console.log(temp)
    setlocalData(temp)
    await fetch(`${uri}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: temp[destinationBoardIndex]._id,
        card: temp[destinationBoardIndex].card,
      }),
    });
    await fetch(`${uri}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: temp[sourceBoardIndex]._id,
        card: temp[sourceBoardIndex].card,
      }),
    });

  };

  const onDragEnd =  (result) => {
    const { source, destination } = result;
    console.log(source,destination)

    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
       const  boardIndex = data.findIndex((e) => {
        return e._id === destination.droppableId
      })
      console.log(boardIndex)
        reorder(
            boardIndex,
            source.index,
            destination.index
        );
    } 
    else {
      const  sourceBoardIndex = data.findIndex((e) => {
        return e._id === source.droppableId
      })
      const  destinationBoardIndex = data.findIndex((e) => {
        return e._id === destination.droppableId
      })

         move(
          sourceBoardIndex,
          destinationBoardIndex,
          source.index,
          destination.index
        );
    }
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
    //console.log(data)
    if(localData){
      setData(localData)
    }else{
      get().then((data) => {
        setData(data);
        setLoading(false)
    });
    }


  }, [data]);

  return (
    
     <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Navbar />
          <div className="main_container">
            <div className="app_boards">
            {loading && <div className="spinner-container"><SpinnerCircular color='pink' size='20vw' /></div> }
            {!loading && <>
             
                {data.map((item,index) => (
                  <>
                  {index < 3 &&

                  <Board
                      cn = "custom__card"
                      key={item._id}
                      id={item._id}
                      localData={data}
                      setlocalData = {setlocalData}
                      index={index}
                      className = {`board${index}`}
                      waitingAPI = {index === 0 ? waitingAPI0: index ===1 ? waitingAPI1: waitingAPI2}
                      name={item.boardName}
                      card={item.card}
                      setName={setName}
                      addCard={addCard}
                      removeCard={removeCard}
                      removeBoard={removeBoard}
                      updateCard={updateCard}
                    />
                  }</>
                  // </Droppable>
                ))}


            </>
              }
            </div>
            <div className="leader_boards">
              {data.map((item,index) => (
                  <>
                  {index > 2 &&
                  <Board
                      cn = "lb"
                      key={item._id}
                      id={item._id}
                      index={index}
                      className = {`board${index}`}
                      name={item.boardName}
                      card={item.card}
                      setName={setName}
                      addCard={addCard}
                      removeCard={removeCard}
                      removeBoard={removeBoard}
                      updateCard={updateCard}
                    />}
                </>

                ))}

            </div>
          </div>
 
      </div>
    
    
    
      </DragDropContext>

  );
}

export default App;
