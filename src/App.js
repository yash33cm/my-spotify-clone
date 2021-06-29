import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
function App() {
  // const code = new URLSearchParams(window.location.search).get("code");

  const [token, settoken] = useState();
  useEffect(() => {
    const gettoken = window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let arr = item.split("=");
        initial[arr[0]] = decodeURIComponent(arr[1]);
        return initial;
      }, {});
    const _token = gettoken.access_token;
    const expires = gettoken.expires_in;
    settoken(_token);
    console.log(gettoken);
    console.log("the token after my hard ass >>>>>>>", _token);
    console.log("the expiry  after my hard ass >>>>>>>", expires);
  }, []);

  return (
    <div className="app">{token ? <Dashboard token={token} /> : <Login />}</div>
  );
}
<Router>
  <Switch>
    <Route exact path="/">
      <Login />
    </Route>
  </Switch>
</Router>;

export default App;
