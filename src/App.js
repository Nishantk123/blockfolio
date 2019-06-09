import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import CoinList from "./component/CoinList";
import CoinDetails from "./component/CoinDetails";
import Landing from "./component/Landing";
import News from "./component/News";
import Signal from "./component/Signal";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  var customStyle = {
    minHeight: window.innerHeight
  };
  return (
    <Router>
      <div className="App" style={customStyle}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/coindetail" component={CoinDetails} />
        <Route exact path="/signal" component={Signal} />
        <Route exact path="/mar" component={CoinList} />
        <Route exact path="/news" component={News} />
      </div>
    </Router>
  );
}

export default App;
