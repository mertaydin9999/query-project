import React from "react";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import AlbumListItem from "./AlbumListItem";

function AlbumList({ user }) {
  const [addAlbum, results] = useAddAlbumMutation();
  const { data, isFetching, isError } = useFetchAlbumsQuery(user);
  const handleAlbumAdd = () => {
    addAlbum(user);
  };
  let content;
  if (isFetching) {
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px" }} />
    );
  } else if (isError) {
    content = <div>Hata var</div>;
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  }
  return (
    <>
      <div>
        <div className="topArrangement">
          <h3>{user.name} Albumu </h3>
          <Button onClick={handleAlbumAdd} variant="outlined">
            {results.isLoading ? (
              <CircularProgress />
            ) : (
              <span>Album Ekle+</span>
            )}
          </Button>
        </div>
      </div>
      <div>{content}</div>
    </>
  );
}

export default AlbumList;
