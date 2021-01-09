import React from 'react';
import CountUp from 'react-countup';
import styles from './Cards.module.css';

const Cards = ({
  totalConfirmed,
  totalRecovered,
  totalDeaths,
  lastUpdate,
  country,
  countryData,
}) => {
  const cardsData = [
    {
      cardName: 'cardInfected',
      cardTitle: 'Infected',
      totalCount:
        country === 'Global'
          ? totalConfirmed
          : countryData[0]
          ? countryData[0]
          : 0,
      descriptionName: 'infectedDescription',
      description: 'COVID-19 ACTIVE CASES',
    },
    {
      cardName: 'cardRecovered',
      cardTitle: 'Recovered',
      totalCount:
        country === 'Global'
          ? totalRecovered
          : countryData[2]
          ? countryData[2]
          : 0,
      descriptionName: 'recoveredDescription',
      description: 'COVID-19 RECOVERED CASES',
    },
    {
      cardName: 'cardDeaths',
      cardTitle: 'Deaths',
      totalCount:
        country === 'Global'
          ? totalDeaths
          : countryData[1]
          ? countryData[1]
          : 0,
      descriptionName: 'deathsDescription',
      description: 'DEATHS CAUSED BY COVID-19',
    },
  ];

  return (
    <div className={styles.container}>
      {cardsData.map((card, index) => {
        const {
          cardName,
          cardTitle,
          totalCount,
          descriptionName,
          description,
        } = card;
        return (
          <div key={index} className={styles[cardName]}>
            <h1>{cardTitle}</h1>
            <h2>
              <CountUp
                start={0}
                end={totalCount}
                duration={2.5}
                separator=','
              />
            </h2>
            <h2>{new Date(lastUpdate).toDateString()}</h2>
            <h3 className={styles[descriptionName]}>{description}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
