import React from 'react';

const CurrentWeather = ({ currentWeatherData, style }) => {
  return (
    <div className='weather-container' style={style}>
      {currentWeatherData && (
        <>
          <h4>{currentWeatherData.location.name}</h4>
          <h6>{currentWeatherData.location.country}</h6>
          <div className='d-flex justify-content-start align-items-center gap-3'>
            <div>
              <h1>{currentWeatherData.current.temp_c}&deg;</h1>
              <h6>{currentWeatherData.current.condition.text}</h6>
            </div>
            <img src={currentWeatherData.current.condition.icon} alt='' />
          </div>
          <h6 className='mt-5'>
            Feels like {currentWeatherData.current.feelslike_c}&deg;
          </h6>
          <h6 style={{ fontSize: '0.8rem' }}>
            {currentWeatherData.location.localtime}
          </h6>
        </>
      )}
    </div>
  );
};

export default CurrentWeather;
