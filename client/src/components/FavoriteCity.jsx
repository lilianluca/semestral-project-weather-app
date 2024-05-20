import React from 'react';
import { Button } from 'react-bootstrap';

function FavoriteCity({
  favoriteCity,
  handleContextMenu,
  getCurrentWeatherData,
  getHistoricalWeatherData,
  getForecastData,
  historyDate,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getCurrentWeatherData(favoriteCity.city_name);
        getHistoricalWeatherData(favoriteCity.city_name, historyDate);
        getForecastData(favoriteCity.city_name);
      }}
    >
      <Button
        onContextMenu={(e) => handleContextMenu(e, favoriteCity)}
        variant='dark'
        type='submit'
        className='w-100'
      >
        {favoriteCity.city_name}
      </Button>
    </form>
  );
}

export default FavoriteCity;
