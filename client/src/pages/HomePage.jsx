import React, { useEffect, useContext, useState } from "react";
import Layout from "../components/Layout";
import KanbanBoard from "../components/KanbanBoard";
import { fetchUser } from "../redux/slices/UsersSlice";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();
  const viewingId = localStorage.getItem("viewingId");
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      if (viewingId) {
        const fetchedOwner = await dispatch(fetchUser(viewingId));
        setOwner(fetchedOwner.payload);
      }
    };

    fetchOwner();
  }, [viewingId, dispatch]);

  return (
    <Layout>
      {owner && (
        <div className="flex justify-between bg-white">
          <div className="font-bold my-4 text-3xl ml-4">Library</div>
          <div className="flex items-center pe-2">
            <div className="font-bold my-4 text-2xl mr-2">{owner.userName}</div>
            <img
              src={owner.profilePicture}
              alt=""
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "500px",
              }}
            />
          </div>
        </div>
      )}

      <KanbanBoard />
    </Layout>
  );
}
