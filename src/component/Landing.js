import React, { Component } from "react";
import up from "../Icons/up.png";
import down from "../Icons/down.png";
import home from "../Icons/home.png";
import sign from "../Icons/sign.png";
import news from "../Icons/news.png";
import signal from "../Icons/signal.png";
import add from "../Icons/add.png";
import bell from "../Icons/bell.png";
import menu from "../Icons/menu.png";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      coinDataList: [],
      coinNameList: [],
      portfolio: []
    };
  }
  componentWillMount() {}
  componentDidMount() {
    this.getCoinDataList();
    this.getPortFolio();
    this.interval = setInterval(() => {
      this.getCoinDataList();
      this.getPortFolio();
    }, 1000);
  }
  // for getting the portfolio data

  getPortFolio() {
    fetch(
      "https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Kraken"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          portfolio: res.RAW
        });
      });
  }

  // for getting the coin detail

  getCoinDataList() {
    var coinNameList = ["BTC", "ETH", "EOS", "BCH"];
    fetch(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
        coinNameList +
        "&tsyms=USD,EUR"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          coinDataList: res.RAW
        });
      });
  }

  // number formetter
  commarize(data) {
    // Alter numbers larger than 1k
    if (data >= 1e3) {
      var units = ["k", "M", "B", "T"];

      // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
      let unit = Math.floor((data.toFixed(0).length - 1) / 3) * 3;
      // Calculate the remainder
      var num = (data / ("1e" + unit)).toFixed(0);
      var unitname = units[Math.floor(unit / 3) - 1];

      // output number remainder + unitname
      return num + unitname;
    }

    // return formatted original number
    return data.toLocaleString();
  }

  //  for switch to new section

  newsHandler = () => {
    this.props.history.push({
      pathname: "/news"
    });
  };

  // for switching to coindetail

  allCoinHandler = () => {
    this.props.history.push({
      pathname: "/mar"
    });
  };

  // on coinlist click handler

  onCoinClickHandler = coinName => {
    var coinName = coinName ? coinName : "BTC";
    this.props.history.push({
      pathname: "/coindetail",
      state: { coinName: coinName }
    });
  };

  // for switching to signal

  onSignClickHandler = coinName => {
    this.props.history.push({
      pathname: "/signal"
    });
  };

  render() {
    //for the header or portFolio/
    var portFolioTotalAmount =
      this.state.portfolio && this.state.portfolio.VOLUME24HOURTO
        ? Number(this.state.portfolio.VOLUME24HOURTO).toFixed(2)
        : "";

    var portfolioCHANGEPCTDAY =
      this.state.portfolio && this.state.portfolio.CHANGEPCT24HOUR
        ? Number(this.state.portfolio.CHANGEPCT24HOUR).toFixed(2)
        : "";

    var changePcDayPortClass =
      portfolioCHANGEPCTDAY > 0 ? "coin-up" : "coin-down";

    var changePcDayPortIcon = portfolioCHANGEPCTDAY > 0 ? up : down;

    var coindata = this.state.coinDataList;
    var result = Object.keys(coindata).map(function(key) {
      return coindata[key];
    });

    //  for Coin list detail

    let CoinList = [];
    if (result && result.length > 0) {
      result.forEach((data, index) => {
        var coinPrice = data.USD && data.USD.PRICE ? data.USD.PRICE : "";
        var fullVolumn24Hour =
          data.USD && data.USD.VOLUME24HOURTO
            ? this.commarize(data.USD.VOLUME24HOURTO)
            : "";
        var baseURL = data.USD && data.USD.IMAGEURL ? data.USD.IMAGEURL : "";
        var CHANGEPCTDAY =
          data.USD && data.USD.CHANGEPCTDAY ? data.USD.CHANGEPCTDAY : "";
        var changePcDayClass = CHANGEPCTDAY > 0 ? "coin-up" : "coin-down";
        var changePcDayIcon = CHANGEPCTDAY > 0 ? up : down;
        var imageUrl = "https://www.cryptocompare.com" + baseURL;
        var coinName =
          data.USD && data.USD.FROMSYMBOL ? data.USD.FROMSYMBOL : "";
        CoinList.push(
          <div className="coin-container" key={index}>
            <div className="row">
              <div
                className="col-sm-4 col-xs-4"
                onClick={() => this.onCoinClickHandler(coinName)}
              >
                <div className="coin-image">
                  <img className="c-image" src={imageUrl} />
                </div>
                <div className="coin-name">{coinName}</div>
              </div>
              <div className="col-sm-4 col-xs-4">
                <div className="">{"$" + coinPrice}</div>
                <div className={changePcDayClass}>
                  {Number(CHANGEPCTDAY).toFixed(2) + "%"}
                  <span>
                    <img src={changePcDayIcon} />
                  </span>
                </div>
              </div>
              <div className="col-sm-2 col-xs-4 fullvolumn">
                {"$" + fullVolumn24Hour}
                {/* <div className="add-button">Add</div> */}
              </div>
              <div className="col-sm-2 icon-align">
                <img src={bell} />
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        <div className="header-title">
          Blockfolio
          <div className="menu-vertical">
            <img className="menu-vertical-icon" src={menu} />
          </div>
        </div>
        <div className="portfolio-container">
          <div className="row">
            <div className="col-sm-6 portfolio-name">PORTFOLIO 1</div>
            <div className="col-sm-6 portfolio-volumn">
              24HR
              <span className={changePcDayPortClass}>
                {" " + portfolioCHANGEPCTDAY + "%"}
              </span>
              <span>
                <img src={changePcDayPortIcon} />
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 portfolio-amount">
              ${portFolioTotalAmount}
            </div>
            <div className="col-sm-6">
              <div className="icon portfolio-icon">
                <img className="bottom-icon" src={sign} />
              </div>
            </div>
          </div>
        </div>
        <div className="coin-list-heading-container">
          <div className="row coin-list-heading">
            <div className="col-sm-4 heading-label">COIN</div>
            <div className="col-sm-4 heading-label">PRICE</div>
            <div className="col-sm-2 heading-label">HOLDING</div>
            <div className="col-sm-2 icon-align">
              <img src={bell} />
            </div>
          </div>
        </div>
        {CoinList}
        <div className="row bottom-bar-container">
          <div className="col-sm-2 icon-align">
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
          <div
            className="col-sm-3 icon-align"
            onClick={() => this.newsHandler()}
          >
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
export default Landing;
