import { useState, useEffect } from "react";
import SongDisplay from "./SongDisplay";
import Player from "./Player";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./dashboard.css";
import SpotifyWebApi from "spotify-web-api-node";
function Dashboard({ token }) {
  const history = useHistory();

  const spotify = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  const [searchresults, setSearchresults] = useState([]);
  const [search, setSearch] = useState("");
  const [playTrack, setPlayTrack] = useState();
  const [coverpic, setcoverpic] = useState();
  const [artist, setartist] = useState();
  const [name, setname] = useState();
  const [lyrics, setlyrics] = useState();

  function chooseTrack(track) {
    setPlayTrack(track);
    setcoverpic(track.largerpic);
    setartist(track.artist);
    setname(track.name);
    console.log(track.largerpic);
    setSearch("");
  }
  console.log(searchresults);

  spotify.setAccessToken(token);
  if (token) {
    window.history.pushState({}, null, "/");
  }
  // useEffect(() => {
  //   if (!token) {
  //     window.location = "/";
  //     return;
  //   }

  // }, [token]);

  // const findlyrics = async () => {
  //   let lyric = (await lyricsFinder(artist, name)) || "lyrics not found";
  //   setlyrics(lyric);
  //   console.log(lyric);
  // };

  // useEffect(
  //   () => {
  //     if (!artist || !name) return;
  //     findlyrics();
  //   },
  //   [artist],
  //   [name]
  // );

  useEffect(() => {
    if (!playTrack) return;
    axios
      .get("https://spotify-myclone-server.herokuapp.com/lyrics", {
        params: {
          title: playTrack.name,
          artist: playTrack.artist,
        },
      })
      .then((res) => {
        console.log(res.data.lyrics);
        setlyrics(res.data.lyrics);
      });
  }, [playTrack]);

  useEffect(() => {
    if (!search) return setSearchresults([]);
    if (!token) {
      window.location = "/";
      return;
    }

    let cancel = false;
    spotify
      .searchTracks(search)
      .then((res) => {
        if (cancel) return;
        setSearchresults(
          res.body.tracks.items.map((item) => {
            const albumcoverpic = item.album.images.reduce((initial, image) => {
              if (initial.height > image.height) return image;
              return initial;
            }, item.album.images[0]);

            const largecoverpic = item.album.images.reduce((initial, image) => {
              if (initial.height < image.height) return image;
              return initial;
            }, item.album.images[0]);
            return {
              name: item.name,
              artist: item.artists[0].name,
              uri: item.uri,
              albumpic: albumcoverpic.url,
              largerpic: largecoverpic.url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        window.location = "/";
      });

    return () => (cancel = true);
  }, [search, token]);

  const handlelogout = () => {
    const url = "https://www.spotify.com/logout";
    const spotifyLogoutWindow = window.open(
      url,
      "Spotify Logout",
      "width=700,height=500,top=40,left=40"
    );
  };

  return (
    // <div>{token}</div>
    <div className="dashboard">
      <div className="top">
        <div className="img" onClick={handlelogout}>
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt=""
          />
        </div>

        <form>
          <input
            type="search"
            placeholder="search songs/artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="middle">
        {searchresults.map((track) => (
          <SongDisplay
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchresults.length == 0 && coverpic && (
          <div className="imageshow">
            <div className="image">
              {" "}
              <img loading="lazy" src={playTrack.largerpic} alt="" />
            </div>
            <div className="lyrics">
              <h1>Enjoy the Lyrics</h1>
              <hr />
              <p>{lyrics}</p>
              {lyrics === "Lyrics of this song is not found" ? (
                ""
              ) : (
                <hr classname="hr" />
              )}
            </div>
          </div>
        )}
        {searchresults.length == 0 && !playTrack && (
          <div className="welcome">
            <div className="welhead">
              <h1>
                welcome to spotify-clone search your music and enjoy listening !
              </h1>
            </div>
          </div>
        )}
      </div>

      <div className="botom">
        <Player token={token} trackUri={playTrack?.uri} />
      </div>
    </div>
  );
}

export default Dashboard;
