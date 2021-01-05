import React, {useState, useEffect} from 'react'
import './Graph.css';
import '../../styles/HelperStyles.css';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

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
            format: "MM/DD/YY",
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
                y : data[casesType][date] - lastCoordinate
            }
            chartData.push(newCoordinate);
        }
        lastCoordinate = data[casesType][date];
    }
    return chartData;
}

function Graph({casesType = 'cases'}) {
    const [data, setData] = useState([]);    

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=60')
                .then(resp => resp.json())
                    .then(data => {
                        const chartData = buildChart(data, 'cases');
                        setData(chartData);
                    })
                .catch(err => console.log(err));
        };
        fetchData();
    }, [casesType]);

    return (
        <div className="covid-graph">
            {data?.length > 0 && (                
                <Line 
                    data ={{
                        datasets: [{
                                backgroundColor: 'rgba(204, 16, 52, 0.8)',
                                borderColor: '#CC1034',
                                data: data,
                            },
                        ],
                    }} 
                    options = {options} 
                />
            )}
        </div>
    )
}

export default Graph
