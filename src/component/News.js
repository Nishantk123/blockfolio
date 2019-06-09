import React, { Component } from "react";
import CoinList from "./CoinList";
import CoinDetails from "./CoinDetails";
import BottomBar from "./BottomBar";
import up from "../Icons/up.png";
import down from "../Icons/down.png";
import home from "../Icons/home.png";
import sign from "../Icons/sign.png";
import news from "../Icons/news.png";
import signal from "../Icons/signal.png";
import add from "../Icons/add.png";
import menu from "../Icons/menu.png";
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: []
    };
  }
  componentDidMount() {
    this.getNews();
    this.interval = setInterval(() => {
      this.getNews();
    }, 5000);
  }
  getNews() {
    fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          newsList: res.Data
        });
      });
  }
  homeHandler = () => {
    this.props.history.push({
      pathname: "/"
    });
  };
  allCoinHandler = () => {
    this.props.history.push({
      pathname: "/mar"
    });
  };

  onSignClickHandler = coinName => {
    var coinName = coinName ? coinName : "BTC";
    this.props.history.push({
      pathname: "/signal",
      state: { coinName: coinName }
    });
  };
  render() {
    var newslist = [];
    if (this.state.newsList && this.state.newsList.length > 0) {
      this.state.newsList.forEach((data, index) => {
        newslist.push(
          <div className="news-container">
            <div className="row news-story">
              <div className="col-sm-8">
                <div className="news-body">{data.title}</div>
                <div class="news-title">{data.categories}</div>
              </div>
              <div className="col-sm-4 news-image-container">
                <img src={data.imageurl} />
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        {/* <CoinList /> */}
        <div className="row news-header">
          NEWS
          <div className="menu-vertical">
            <img className="menu-vertical-icon" src={menu} />
          </div>
        </div>
        <div class="news-top-data">
          <div className="row top-row">
            <div className="col-sm-8 latest-story">Latest Stories</div>
            <div className="col-sm-4 source">Sources</div>
          </div>
        </div>
        {newslist}
        {/* < CoinDetails /> */}
        <div className="row bottom-bar-container">
          <div
            className="col-sm-2 icon-align"
            onClick={() => this.homeHandler()}
          >
            <div className="icon">
              <img className="bottom-icon" src={home} />
            </div>
            <div className="nav-name">Home</div>
          </div>
          <div
            className="col-sm-3 icon-align"
            onClick={() => this.onSignClickHandler()}
          >
            <div className="icon">
              <img className="bottom-icon" src={sign} />
            </div>
            <div className="nav-name">Sign</div>
          </div>
          <div className="col-sm-2">
            <div className="add-icon">
              <img className="add-bottom-icon" src={add} />
            </div>
          </div>
          <div
            className="col-sm-2 icon-align"
            onClick={() => this.allCoinHandler()}
          >
            <div className="icon">
              <img className="bottom-icon" src={signal} />
            </div>
            <div className="nav-name">Mar</div>
          </div>
          <div className="col-sm-3 icon-align">
            <div className="icon">
              <img className="bottom-icon" src={news} />
            </div>
            <div className="nav-name">News</div>
          </div>
        </div>
      </div>
    );
  }
}
export default News;
