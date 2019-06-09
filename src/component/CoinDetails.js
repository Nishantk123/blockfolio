import React, { Component } from "react";
import "../Style/CoinList.css";
import { Line } from "react-chartjs-2";
import moment from "moment";
import up from "../Icons/up.png";
import down from "../Icons/down.png";
import menu from "../Icons/menu.png";
import left from "../Icons/left.png";

class coinDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      coinDetails: [],
      coinNameList: [],
      chartData: [],
      chartLabel: [],
      coinName: ""
    };
  }
  componentWillMount() {
    let coinName = this.props.location.state.coinName;
    this.setState({ coinName: coinName });
  }

  componentDidMount() {
    this.getHistoryData();
    this.getCoinDetailer();
    this.interval = setInterval(() => {
      this.getHistoryData();
      this.getCoinDetailer();
    }, 1000);
  }

  // getting Coin Detail

  getCoinDetailer() {
    fetch(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
        this.state.coinName +
        "&tsyms=USD,EUR"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          coinDetails: res.RAW
        });
      });
  }
  //   for getting chart data
  getHistoryData() {
    fetch(
      "https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=10"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          chartData: res.Data
        });
      });
  }
  // for chart
  getChart(label, data) {
    const chartData_react = {
      labels: label,
      datasets: [
        {
          label: "",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data
        }
      ]
    };
    return chartData_react;
  }

  backHandler = () => {
    this.props.history.push({
      pathname: "/"
    });
  };
  render() {
    let coinDetail = [];
    var chartLabel = [];
    var chartData = [];
    var imageUrl = "";
    var coinPrice = 0;
    var CHANGEPCTDAY = 0;
    var changePcDayClass = "";
    var changePcDayIcon = "";
    var MKTCAP = 0;
    var VOLUMEDAY = 0;
    var TOTALVOLUME24H = 0;
    var HIGH24HOUR = 0;
    var PRICE = 0;
    var HIGHHOUR = 0;
    var VOLUMEHOUR = 0;
    var SUPPLY = 0;
    if (this.state.chartData && this.state.chartData.length > 0) {
      this.state.chartData.forEach((data, index) => {
        var time = moment(data.time).format("mm:ss");
        chartLabel.push(time);
        chartData.push(data.low);
      });
    }

    for (var key in this.state.coinDetails) {
      var data = this.state.coinDetails[key];
      coinPrice = data.USD && data.USD.PRICE ? data.USD.PRICE : "";
      var fullVolumn24Hour =
        data.USD && data.USD.VOLUME24HOURTO ? data.USD.VOLUME24HOURTO : "";
      var baseURL = data.USD && data.USD.IMAGEURL ? data.USD.IMAGEURL : "";
      CHANGEPCTDAY =
        data.USD && data.USD.CHANGEPCTDAY ? data.USD.CHANGEPCTDAY : "";
      changePcDayClass = CHANGEPCTDAY > 0 ? "coin-up" : "coin-down";
      changePcDayIcon = CHANGEPCTDAY > 0 ? up : down;
      MKTCAP = data.USD.MKTCAP;
      VOLUMEDAY = data.USD.VOLUMEDAY;
      TOTALVOLUME24H = data.USD.TOTALVOLUME24H;
      HIGH24HOUR = data.USD.HIGH24HOUR;
      PRICE = data.USD.PRICE;
      HIGHHOUR = data.USD.HIGHHOUR;
      VOLUMEHOUR = data.USD.VOLUMEHOUR;
      SUPPLY = data.USD.SUPPLY;
      imageUrl = "https://www.cryptocompare.com" + baseURL;
      var coinName = key;
      var dataChart = this.getChart(chartLabel, chartData);
      coinDetail.push(
        <div className="coin-detail-cointainer">
          <div className=" row">
            <Line
              data={dataChart}
              options={{
                display: true,
                position: "top",
                fullWidth: true,
                reverse: false,
                labels: {
                  fontColor: "rgb(255, 99, 132)"
                }
              }}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row coin-head">
          <div
            className="left-icon-container"
            onClick={() => this.backHandler()}
          >
            <img className="left-icon-image" src={left} />
          </div>
          <div class="coin-image-container">
            <img className="coin-top-image" src={imageUrl} />
          </div>
          <span className="coin-top-name"> {this.state.coinName}</span>
          <div className="menu-vertical">
            <img className="menu-vertical-icon" src={menu} />
          </div>
        </div>
        <div className="coin-info-section">
          <div className="row">
            <div className="coin-amount col-sm-6">{"$" + coinPrice}</div>
            <div className="coin-changepc col-sm-6">
              <div className={changePcDayClass}>
                {Number(CHANGEPCTDAY).toFixed(2) + "%"}
                <span>
                  <img src={changePcDayIcon} />
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 coin-base">
              <div className="coinbase">Coinbase</div>
            </div>
            <div className="col-sm-6 coin-usd">
              <div className="coinbase">{this.state.coinName}/USD</div>
            </div>
          </div>
        </div>
        {coinDetail}
        <div className="coin-table-container">
          <table className="coin-table">
            <tbody>
              <tr className="coin-table-tr">
                <td>
                  <div>Makcpta</div>
                  <div>${Number(MKTCAP).toFixed(2)}</div>
                </td>
                <td>
                  <div>Day-volume</div>
                  <div>${Number(VOLUMEDAY).toFixed(2)}</div>
                </td>
              </tr>
              <tr className="coin-table-tr">
                <td>
                  <div>24Hr-volume</div>
                  <div>${Number(TOTALVOLUME24H).toFixed(2)}</div>
                </td>
                <td>
                  <div>High-24Hr</div>
                  <div>${Number(HIGH24HOUR).toFixed(2)}</div>
                </td>
              </tr>
              <tr className="coin-table-tr">
                <td>
                  <div>Price</div>
                  <div>${Number(PRICE).toFixed(2)}</div>
                </td>
                <td>
                  <div>High-hour</div>
                  <div>${Number(HIGHHOUR).toFixed(2)}</div>
                </td>
              </tr>
              <tr className="coin-table-tr">
                <td>
                  <div>Volume-hour</div>
                  <div>${Number(VOLUMEHOUR).toFixed(2)}</div>
                </td>
                <td>
                  <div>Supply</div>
                  <div>${Number(SUPPLY).toFixed(2)}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default coinDetail;
