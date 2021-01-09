import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailySummary } from '../../api';

const Chart = ({ country, countryData }) => {
  const [dailyData, setDailyData] = useState([]);
  const getDailyData = async () => {
    const dailyDataFetched = await fetchDailySummary();
    setDailyData(dailyDataFetched);
  };
  useEffect(() => {
    getDailyData();
  }, []);
  const lineChart = dailyData.length ? (
    <Line
      height={180}
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dailyData.map(({ totalConfirmed }) => totalConfirmed),
            label: 'Infected',
            borderColor: 'rgba(238, 130, 238, 0.5)',
            backgroundColor: 'rgba(238, 130, 238, 0.164)',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths: { total } }) => total),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: ' rgba(255, 0, 0, 0.164)',
            fill: true,
          },
        ],
      }}
      options={{
        legend: {
          labels: {
            fontColor: 'white',
          },
        },
        title: {
          display: true,
          fontColor: 'white',
          text: `${country} Covid-19 Data`,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
            },
          ],
        },
      }}
    />
  ) : null;
  const barChart = countryData.length ? (
    <Bar
      height={150}
      data={{
        datasets: [
          {
            label: 'Infected',
            backgroundColor: 'rgba(238, 130, 238, 0.5)',
            data: [countryData[0]],
          },
          {
            label: 'Recovered',
            backgroundColor: 'lightgreen',
            data: [countryData[2]],
          },
          {
            label: 'Deaths',
            backgroundColor: 'red',
            data: [countryData[1]],
          },
        ],
      }}
      options={{
        tooltips: {
          callbacks: {
            title: function () {
              return '';
            },
          },
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
        },
        title: {
          display: true,
          fontColor: 'white',
          text: `${country} Covid-19 Data`,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
            },
          ],
        },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>
      {country === 'Global' ? lineChart : barChart}
    </div>
  );
};

export default Chart;
