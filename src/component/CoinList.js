import React, { Component } from "react";
import "../Style/CoinList.css";
import up from "../Icons/up.png";
import down from "../Icons/down.png";
import home from "../Icons/home.png";
import sign from "../Icons/sign.png";
import news from "../Icons/news.png";
import signal from "../Icons/signal.png";
import add from "../Icons/add.png";
import menu from "../Icons/menu.png";
class CoinList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint:
        "https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD",
      joke: [],
      coinNameList: [],
      coinList: []
    };
  }
  componentWillMount() {
    // for all CoinList name
    fetch(
      "https://min-api.cryptocompare.com/data/top/totalvol?limit=30&tsym=USD"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        var coinList = [];
        res.Data &&
          res.Data.forEach((data, index) => {
            if (data.CoinInfo && data.CoinInfo.Name) {
              coinList.push(data.CoinInfo.Name);
            }
          });
        this.setState({
          coinNameList: coinList
        });
      });
  }
  componentDidMount() {
    this.getJoke();
    this.getAllDetails();
    this.interval = setInterval(() => {
      this.getJoke();
    }, 1000);
  }
  getJoke() {
    fetch(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
        this.state.coinNameList +
        "&tsyms=USD,EUR"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          joke: res.RAW
        });
      });
  }

  getAllDetails() {
    fetch(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          coinList: res.RAW
        });
      });
  }
  onClickHandler(coinName) {
    this.props.history.push({
      pathname: "/updateuser",
      state: { coinName: coinName }
    });
  }
  newsHandler = () => {
    this.props.history.push({
      pathname: "/news"
      // state:{ coinName:ne }
    });
  };
  homeHandler = () => {
    this.props.history.push({
      pathname: "/"
    });
  };

  onSignClickHandler = coinName => {
    var coinName = coinName ? coinName : "BTC";
    this.props.history.push({
      pathname: "/signal",
      state: { coinName: coinName }
    });
  };
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

  //Handle last name filter
  onChangeHandler = (e, data) => {
    let currentList = [];
    this.finalList = {};
    if (e.target.value !== "") {
      currentList = this.state.joke ? this.state.joke : "";
      for (var key in currentList) {
        const filter = e.target.value.toLowerCase();
        var lc = key.toLocaleLowerCase();
        var datass = lc.includes(filter);
        if (datass) {
          var obj = {
            [key]: currentList[key]
          };
          this.finalList[key] = currentList[key];
        }
      }
    } else {
      this.finalList = this.state.listData ? this.state.listData : "";
    }
    this.setState({ filterData: this.finalList, searchString: e.target.value });
  };

  render() {
    // for getting all coin detail
    var MKTCAP = 0;
    var VOLUME24HOUR = 0;
    var CHANGEPCT24HOUR = 0;
    var CHANGEPCTDAY = 0;
    var changePcDayClass = "";
    var changePcDayIcon = "";
    var changePc24Class = "";
    var changePc24Icon = "";
    for (var key in this.state.coinList) {
      var data = this.state.coinList[key];
      MKTCAP = this.commarize(data.USD.MKTCAP);
      VOLUME24HOUR = this.commarize(data.USD.VOLUME24HOUR);
      CHANGEPCT24HOUR = data.USD.CHANGEPCT24HOUR;
      CHANGEPCTDAY = data.USD.CHANGEPCTDAY;
      changePcDayClass = CHANGEPCTDAY > 0 ? "coin-up" : "coin-down";
      changePcDayIcon = CHANGEPCTDAY > 0 ? up : down;
      changePc24Class = CHANGEPCT24HOUR > 0 ? "coin-up" : "coin-down";
      changePc24Icon = CHANGEPCT24HOUR > 0 ? up : down;
    }
    //
    let CoinList = [];
    var finaldata = this.finalList ? this.finalList : this.state.joke;
    for (var key in finaldata) {
      var data = finaldata[key];
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
      var coinName = key;
      CoinList.push(
        <div className="coin-container">
          <div className="row">
            <div className="col-sm-4 col-xs-4">
              <div className="coin-image">
                <img className="c-image" src={imageUrl} />
              </div>
              <div className="coin-name">{coinName}</div>
            </div>
            <div className="col-sm-4 col-xs-4 icon-align">
              <div className="">{Number(coinPrice).toFixed(2)}</div>
              <div className={changePcDayClass}>
                {Number(CHANGEPCTDAY).toFixed(2) + "%"}
                <span>
                  <img src={changePcDayIcon} />
                </span>
              </div>
            </div>
            <div className="col-sm-4 col-xs-4 icon-align">
              {fullVolumn24Hour}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row search-container">
          <div class="search-field">
            <input
              className="search"
              placeholder="Search over 8000 coins"
              onChange={e => this.onChangeHandler(e)}
            />
            <div className="menu-vertical">
              <img className="menu-vertical-icon" src={menu} />
            </div>
          </div>
        </div>
        <div className="total-coin-view-container">
          <div className="coin-view">
            <table class="coin-view-table">
              <tbody>
                <tr className="coin-tr">
                  <td className="coin-td">
                    <div>Market Cap</div>
                    <div>${MKTCAP}</div>
                    <div className={changePc24Class}>
                      {Number(CHANGEPCT24HOUR).toFixed(2) + "%"}
                      <span>
                        <img src={changePc24Icon} />
                      </span>
                    </div>
                  </td>
                  <td className="coin-td">
                    <div>24HR Volumn</div>
                    <div>$12.3B</div>
                    <div className={changePcDayClass}>
                      {Number(CHANGEPCTDAY).toFixed(2) + "%"}
                      <span>
                        <img src={changePcDayIcon} />
                      </span>
                    </div>
                  </td>
                  <td className="coin-td">
                    <div>BTC Dominance</div>
                    <div>40%</div>
                    <div className={changePcDayClass}>
                      {Number(CHANGEPCTDAY).toFixed(2) + "%"}
                      <span>
                        <img src={changePcDayIcon} />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="coin-list-heading-container">
          <div className="row coinlist-heading">
            <div className="col-sm-4 coinlist-heading-label coin-label">
              COIN
            </div>
            <div className="col-sm-4 coinlist-heading-label icon-align">
              PRICE
            </div>
            <div className="col-sm-4 coinlist-heading-label icon-align">
              CAP/VAL
            </div>
          </div>
        </div>

        {CoinList}
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
          <div className="col-sm-2 icon-align">
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
export default CoinList;
