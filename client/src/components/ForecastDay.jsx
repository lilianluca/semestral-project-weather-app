import React from 'react';

const ForecastDay = ({
  date,
  dailyChanceOfRain,
  iconConditionUrl,
  maxTemp,
  minTemp,
}) => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ fontSize: '24px' }}
    >
      <div style={{ flex: 1, textAlign: 'center' }}>{date}</div>
      <div style={{ flex: 1, textAlign: 'center' }}>{dailyChanceOfRain}%</div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <img
          src={iconConditionUrl}
          alt='Condition'
          style={{ width: '60px', height: '60px' }}
        />
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>{maxTemp}&deg;</div>
      <div style={{ flex: 1, textAlign: 'center' }}>{minTemp}&deg;</div>
    </div>
  );
};

export default ForecastDay;
