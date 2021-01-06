import React, {useState, useEffect} from 'react'
import './Graph.css';
import '../../styles/HelperStyles.css';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52, 0.5)",
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29,0.5)",
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67,0.5)",
  },
};

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: 'month',
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

const buildChart = (data, casesType='cases') => {
    const chartData = [];
    let lastCoordinate;
    for(let date in data[casesType]) {
        if(lastCoordinate){
            const newCoordinate = {
                x : date,
                y : data[casesType][date] - lastCoordinate > 0 ? data[casesType][date] - lastCoordinate : 0
            }
            chartData.push(newCoordinate);
        }
        lastCoordinate = data[casesType][date];
    }
    return chartData;
}

function Graph({casesType, countryCode}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          if(countryCode === 'WoW' || countryCode === 'Wow') { 
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=90')
                .then(resp => resp.json())
                    .then(data => {
                        const chartData = buildChart(data, casesType);
                        setData(chartData);
                    })
                .catch(err => console.log(err));
          } else {
            await fetch(`https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=90`)
                .then(resp => resp.json())
                    .then(data => {
                        const chartData = buildChart(data.timeline, casesType);
                        setData(chartData);
                    })
                .catch(err => console.log(err));
          }
        };
        fetchData();
    }, [casesType, countryCode]);

    return (
        <div className="covid-graph">
            {data?.length > 0 && (                
                <Line 
                    data ={{
                        datasets: [{
                                backgroundColor: casesTypeColors[casesType].hex,
                                borderColor: casesTypeColors[casesType].rgb,
                                data: data,
                            },
                        ],
                    }} 
                    options = {options} 
                    redraw = {true}
                />
            )}
        </div>
    )
}

export default Graph
