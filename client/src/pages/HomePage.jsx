import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Board from "../components/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { SpinnerCircular } from "spinners-react";
import { useSelector } from 'react-redux';
export default function HomePage() {
  const remote = "https://myproject-382821.uc.r.appspot.com/";

  const local = "http://localhost:8081/";
  const [loading, setLoading] = useState(true);
  const [waitingAPI0, setWaitingAPI0] = useState(false);
  const [waitingAPI1, setWaitingAPI1] = useState(false);
  const [waitingAPI2, setWaitingAPI2] = useState(false);
  const [localData, setlocalData] = useState(null);

  var uri = remote;
  const get = async () => {
    const response = await fetch(uri);
    const json = await response.json();
    return json.result;
  };
  const [data, setData] = useState([]);

  const removeCard = async (boardId, cardId) => {
    await fetch(`${uri}${boardId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardId: cardId,
      }),
    });
  };

  const reorder = async (index, startIndex, endIndex) => {
    const temp = [...data];
    const [removed] = temp[index].card?.splice(startIndex, 1);
    temp[index].card?.splice(endIndex, 0, removed);
    setlocalData(temp);

    await fetch(`${uri}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: temp[index]._id,
        card: temp[index].card,
      }),
    });
  };
  const move = async (
    sourceBoardIndex,
    destinationBoardIndex,
    sourceCardIndex,
    destinationCardIndex
  ) => {
    const temp = [...data];
    const [removed] = temp[sourceBoardIndex].card.splice(sourceCardIndex, 1);
    temp[destinationBoardIndex].card.splice(destinationCardIndex, 0, removed);

    setlocalData(temp);
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

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "647289ed971a4bc6787625951") {
        source.droppableId = "647289ed971a4bc678762595";
        destination.droppableId = "647289ed971a4bc678762595";
      }
      const boardIndex = data.findIndex((e) => {
        return e._id === destination.droppableId;
      });
      reorder(boardIndex, source.index, destination.index);
    } else {
      if (source.droppableId === "647289ed971a4bc6787625951") {
        source.droppableId = "647289ed971a4bc678762595";
      }

      if (destination.droppableId === "647289ed971a4bc6787625951") {
        destination.droppableId = "647289ed971a4bc678762595";
      }
      const sourceBoardIndex = data.findIndex((e) => {
        return e._id === source.droppableId;
      });
      const destinationBoardIndex = data.findIndex((e) => {
        return e._id === destination.droppableId;
      });

      move(
        sourceBoardIndex,
        destinationBoardIndex,
        source.index,
        destination.index
      );
    }
    setData(data);
  };

  useEffect(() => {
    if (!localData) {
      get().then((data) => {
        setData(data);
        setLoading(false);
      });
    } else {
      setData(localData);
    }
  }, [localData]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Navbar />
        <div className="grid-container--small">
          {loading && (
            <div className="spinner-container">
              <SpinnerCircular color="pink" size="20vw" />
            </div>
          )}
          {!loading && (
            <>
              {data.map((item, index) => (
                <>
                  {index < 3 && (
                    <Board
                      cn="custom__card"
                      cardColor="black"
                      key={item._id}
                      id={item._id}
                      localData={data}
                      setlocalData={setlocalData}
                      index={index}
                      className={`board${index}`}
                      waitingAPI={
                        index === 0
                          ? waitingAPI0
                          : index === 1
                          ? waitingAPI1
                          : waitingAPI2
                      }
                      name={item.boardName}
                      card={item.card}
                      removeCard={removeCard}
                      uri={uri}
                    />
                  )}
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </DragDropContext>
  );
}

