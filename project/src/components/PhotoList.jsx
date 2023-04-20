import React from "react";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import PhotoListItem from "./PhotoListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

function PhotoList({ album }) {
  const [addPhoto, results] = useAddPhotoMutation();
  const { data, isFetching, isError } = useFetchPhotosQuery(album);
  const handlePhotoAdd = () => {
    addPhoto(album);
  };
  let content;
  if (isFetching) {
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px" }} />
    );
  } else if (isError) {
    content = <div>Hata var</div>;
  } else {
    content = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo} />;
    });
  }
  return (
    <>
      <div>
        <div className="topArrangement">
          <h3>{album.title} Fotolari </h3>
          <Button onClick={handlePhotoAdd} variant="outlined">
            {results.isLoading ? <CircularProgress /> : <span>Foto Ekle+</span>}
          </Button>
        </div>
      </div>
      <div className="photoDiv">{content}</div>
    </>
  );
}

export default PhotoList;
