import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
function Player({ token, trackUri }) {
  const [play, setplay] = useState(false);
  useEffect(() => {
    setplay(true);
  }, [trackUri]);
  if (!token) return;
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={(state) => {
        if (!state.isplaying) setplay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        bgColor: "#181818",
        color: "#fff",
        trackArtistColor: "lightgray",
        trackNameColor: "white",
        sliderColor: "black",
        sliderHandleColor: "black",
        sliderTrackColor: "#383838",
      }}
    />
  );
}

export default Player;
