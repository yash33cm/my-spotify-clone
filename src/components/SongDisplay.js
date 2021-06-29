import React from "react";
import "./songdisplay.css";

function SongDisplay({ track, chooseTrack }) {
  function handleplay() {
    chooseTrack(track);
  }
  return (
    <div className="displaysong" onClick={handleplay}>
      <div className="img">
        <img src={track.albumpic} alt="" />
      </div>

      <div className="text-part">
        <p className="name">{track.name}</p>
        <p className="artist">{track.artist}</p>
      </div>
    </div>
  );
}

export default SongDisplay;
