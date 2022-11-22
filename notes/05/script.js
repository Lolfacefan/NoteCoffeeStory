// // A point click event that uses the Renderer to draw a label next to the point
// // On subsequent clicks, move the existing label instead of creating a new one.
// Highcharts.addEvent(Highcharts.Point, 'click', function () {
//   if (this.series.options.className.indexOf('popup-on-click') !== -1) {
//     const chart = this.series.chart;
//     const date = Highcharts.dateFormat('%A, %b %e, %Y', this.x);
//     const text = `<b>${date}</b><br/>${this.y} ${this.series.name}`;

//     const anchorX = this.plotX + this.series.xAxis.pos;
//     const anchorY = this.plotY + this.series.yAxis.pos;
//     const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
//     const x = align === 'left' ? anchorX + 10 : anchorX - 10;
//     const y = anchorY - 30;
//     if (!chart.sticky) {
//       chart.sticky = chart.renderer
//         .label(text, x, y, 'callout', anchorX, anchorY)
//         .attr({
//           align,
//           fill: 'rgba(0, 0, 0, 0.75)',
//           padding: 10,
//           zIndex: 7 // Above series, below tooltip
//         })
//         .css({
//           color: 'white'
//         })
//         .on('click', function () {
//           chart.sticky = chart.sticky.destroy();
//         })
//         .add();
//     } else {
//       chart.sticky
//         .attr({
//           align,
//           text
//         })
//         .animate({
//           anchorX,
//           anchorY,
//           x,
//           y
//         }, {
//           duration: 250
//         });
//     }
//   }
// });


// Highcharts.chart('container', {

//   chart: {
//     scrollablePlotArea: {
//       minWidth: 700
//     }
//   },

//   data: {
//     csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
//     beforeParse: function (csv) {
//       return csv.replace(/\n\n/g, '\n');
//     }
//   },

//   title: {
//     text: 'Daily sessions at www.highcharts.com'
//   },

//   subtitle: {
//     text: 'Source: Google Analytics'
//   },

//   xAxis: {
//     tickInterval: 7 * 24 * 3600 * 1000, // one week
//     tickWidth: 0,
//     gridLineWidth: 1,
//     labels: {
//       align: 'left',
//       x: 3,
//       y: -3
//     }
//   },

//   yAxis: [{ // left y axis
//     title: {
//       text: null
//     },
//     labels: {
//       align: 'left',
//       x: 3,
//       y: 16,
//       format: '{value:.,0f}'
//     },
//     showFirstLabel: false
//   }, { // right y axis
//     linkedTo: 0,
//     gridLineWidth: 0,
//     opposite: true,
//     title: {
//       text: null
//     },
//     labels: {
//       align: 'right',
//       x: -3,
//       y: 16,
//       format: '{value:.,0f}'
//     },
//     showFirstLabel: false
//   }],

//   legend: {
//     align: 'left',
//     verticalAlign: 'top',
//     borderWidth: 0
//   },

//   tooltip: {
//     shared: true,
//     crosshairs: true
//   },

//   plotOptions: {
//     series: {
//       cursor: 'pointer',
//       className: 'popup-on-click',
//       marker: {
//         lineWidth: 1
//       }
//     }
//   },

//   series: [{
//     name: 'All sessions',
//     lineWidth: 4,
//     marker: {
//       radius: 4
//     }
//   }, {
//     name: 'New users'
//   }]
// });


let curencys = [{
        name: 'USDT',
        volume: 100,
        round: 2
    },
    {
        name: 'LTC',
        volume: 100,
        round: 0
    },
    {
        name: 'BTC',
        volume: 100,
        round: 0
    },
    {
        name: 'ETH',
        volume: 100,
        round: 0
    },
    {
        name: 'XRP',
        volume: 100,
        round: 5
    }

];



let respPlace = document.querySelector('#intro');
console.log(respPlace);

curencys.forEach((u) => {
    var newElement = document.createElement('div');
    newElement.classList.add('string');
    newElement.setAttribute("id", `${u.name}`);
    newElement.innerHTML = ``;
    respPlace.append(newElement);


});


function viewResult(curencys) {


    // Запрашиваем курс доллара для почтета обьма в долларах
    let binancePriceUSDT;
    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=USDTRUB`)
        .then(response => response.json())
        .then(json => {
            binancePriceUSDT = json.price;
            binancePriceUSDT = parseFloat(binancePriceUSDT);
            // Расчитаваем каждую пару
            curencys.forEach((curency, i) => {
                setTimeout(() => {


                    let binancePrice = 0;
                    fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${curency.name}RUB`)
                        .then(response => response.json())
                        .then(json => {
                            binancePrice = json.price;
                            binancePrice = parseFloat(binancePrice).toFixed(curency.round);
                            yobit();
                        });

                    function yobit() {
                        axios.get(`http://127.0.0.1:8000/1/yobit/${curency.name}-RUB`).then((data) => {

                            let asks = data.data.asks,
                                bids = data.data.bids,
                                flagAsks = true,
                                flagBids = true,
                                yobitAsksPrice,
                                yobitBidsPrice,
                                resultSell,
                                resultBuy;

                            // Цена покупки
                            for (let i of asks) {
                                if (parseFloat(i[1]) > (curency.volume * binancePriceUSDT) / parseFloat(i[0])) {
                                    yobitAsksPrice = i[0].toFixed(8);
                                    resultBuy = 100 - (binancePrice / yobitAsksPrice * 100);
                                    resultBuy = resultBuy.toFixed(2);
                                    yobitAsksPrice = parseFloat(yobitAsksPrice).toFixed(curency.round);
                                    flagAsks = false;
                                    break;
                                }
                            }
                            if (flagAsks) {
                                yobitAsksPrice = 'None';
                                resultBuy = 'None';

                            }

                            for (let i of bids) {
                                if (parseFloat(i[1]) > (curency.volume * binancePriceUSDT) / parseFloat(i[0])) {
                                    yobitBidsPrice = i[0].toFixed(8);
                                    resultSell = 100 - (binancePrice / yobitBidsPrice * 100);
                                    resultSell = resultSell.toFixed(2);
                                    yobitBidsPrice = parseFloat(yobitBidsPrice).toFixed(curency.round);
                                    flagBids = false;
                                    break;
                                }
                            }
                            if (flagBids) {
                                yobitBidsPrice = 'None';
                                resultSell = 'None';

                            }
                            let time = new Date(),
                                hourse = time.getHours(),
                                minutes = time.getMinutes(),
                                seconds = time.getSeconds();
                            if (minutes < 10) {
                                minutes = `0${minutes}`;
                            }
                            if (seconds < 10) {
                                seconds = `0${seconds}`;
                            }
                            let updateElement = document.querySelector(`#${curency.name}`);
                            updateElement.innerHTML = `
                  <div class="timeUpdate">${hourse}:${minutes}:${seconds}</div>
                  <div class="nameCurency">${curency.name}/RUB</div>
                  <div class="spread">${resultSell}%/${resultBuy}%</div>
                  <div class="spread">${binancePrice}</div>
                  <div class="spread">${yobitBidsPrice}/${yobitAsksPrice}</div>`;

                            console.log(`${hourse}:${minutes}:${seconds}  Спед ${curency.name}/RUB продажа/покупка: ${resultSell}%/${resultBuy}% binance: ${binancePrice} yobit: ${yobitBidsPrice}/${yobitAsksPrice}`);
                        });
                    }
                }, (i+1) * 2000);
            });

        });



}

let lol = 0;
viewResult(curencys);
let counter = setInterval(() => {
    viewResult(curencys);
}, 20000);