import React, { useEffect } from 'react';
import ForecastDay from './ForecastDay';
import getDayName from '../utils/functions/date/getDayName';

const styles = { width: '75%' };

const Forecast = ({ data }) => {
  if (data) {
    return (
      <div className='weather-container' style={styles}>
        <h4>{data.location.name}</h4>
        <h6 className='mb-4'>{data.location.country}</h6>
        {data.forecast.forecastday.map((day, index) => (
          <ForecastDay
            key={index}
            date={getDayName(day.date)}
            dailyChanceOfRain={day.day.daily_chance_of_rain}
            iconConditionUrl={day.day.condition.icon}
            maxTemp={day.day.maxtemp_c}
            minTemp={day.day.mintemp_c}
          />
        ))}
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default Forecast;
