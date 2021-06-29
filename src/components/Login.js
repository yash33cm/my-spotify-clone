import React from "react";
import "./login.css";

const auth_uri = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&https://my-spotify-clones.herokuapp.com/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&response_type=token&show_dialog=true`;
function Login() {
  return (
    <div className="login">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt=""
      />
      <a href={auth_uri}>
        <button className="btn">Login with Spotify</button>
      </a>
    </div>
  );
}

export default Login;
