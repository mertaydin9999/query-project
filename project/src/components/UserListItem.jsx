import React from "react";
import ExpendablePanel from "./ExpendablePanel";
import AlbumList from "./AlbumList";
import { GoTrashcan } from "react-icons/go";
import { useRemoveUserMutation } from "../store";
import CircularProgress from "@mui/material/CircularProgress";
function UserListItem({ user }) {
  const [removeUser, results] = useRemoveUserMutation();

  const handleClick = () => {
    removeUser(user);
  }; 

  const header = (
    <>
      <button
        style={{ marginRight: "30px", border: "none", cursor: "pointer" }}
        onClick={handleClick}
      >
        {results.isLoading ? (
          <CircularProgress style={{ width: "20px", height: "20px" }} />
        ) : (
          <GoTrashcan />
        )}
      </button>
      {user.name}
    </>
  );
  return (
    <div>
      <ExpendablePanel header={header}>
        <AlbumList user={user} />
      </ExpendablePanel>
    </div>
  );
}

export default UserListItem;
