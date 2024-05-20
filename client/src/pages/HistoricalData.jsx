import React from 'react';
import { useState, useEffect, useRef } from 'react';
import api from '../api';
import FavoriteCity from '../components/FavoriteCity';
import ContextMenu from '../components/ContextMenu';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import CurrentWeather from '../components/CurrentWeather';
import HistoricalWheater from '../components/HistoricalWheater';
import Forecast from '../components/Forecast';

const currentWeatherStyles = { width: '75%' };

const getMinDate = () => {
  let date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
};

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

function HistoricalData() {
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [favoriteCityName, setFavoriteCityName] = useState('');
  const contextMenuRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
    item: null,
  });
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [historicalWeatherData, setHistoricalWeatherData] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [historyDate, setHistoryDate] = useState(formatDate(new Date()));
  const [forecastData, setForecastData] = useState(null);

  const getForecastData = (city) => {
    api
      .get(`/weather-api/v1/forecast/${city}`)
      .then((res) => res.data)
      .then((data) => {
        setForecastData(data);
      })
      .catch((err) => alert(err));
  };

  const getCurrentWeatherData = (city) => {
    api
      .get(`/weather-api/v1/current/${city}`)
      .then((res) => res.data)
      .then((data) => {
        setCurrentWeatherData(data);
      })
      .catch((err) => alert(err));
  };

  const getHistoricalWeatherData = (city, historyDate) => {
    api
      .get(`/weather-api/v1/history/${city}/${historyDate}`)
      .then((res) => res.data)
      .then((data) => {
        setHistoricalWeatherData(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getCurrentWeatherData('Liberec');
    getForecastData('Liberec');
    getHistoricalWeatherData('Liberec', historyDate);
    getFavoriteCities();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (contextMenuRef.current) {
        if (!contextMenuRef.current.contains(e.target)) {
          resetContextMenu();
        }
      }
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  });

  const resetContextMenu = () => {
    setContextMenu({
      position: {
        x: 0,
        y: 0,
      },
      toggled: false,
    });
  };

  const getFavoriteCities = () => {
    api
      .get('/weather-api/v1/favorite-cities/')
      .then((res) => res.data)
      .then((data) => {
        setFavoriteCities(data);
      })
      .catch((err) => alert(err));
  };

  const deleteFavoriteCity = (id) => {
    api
      .delete(`/weather-api/v1/favorite-cities/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert('City deleted!');
        else alert('Failed to delete city.');
        getFavoriteCities();
      })
      .catch((error) => alert(error));
  };

  const createFavoriteCity = (e) => {
    e.preventDefault();
    api
      .post('/weather-api/v1/favorite-cities/', { city_name: favoriteCityName })
      .then((res) => {
        if (res.status === 201) alert('City created!');
        else alert('Failed to create city.');
        getFavoriteCities();
      })
      .catch((err) => alert(err));
  };

  const handleContextMenu = (e, favoriteCity) => {
    e.preventDefault();
    const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
    const isLeft = e.clientX < window?.innerWidth / 2;
    let x;
    let y = e.clientY;
    if (isLeft) {
      x = e.clientX;
    } else {
      x = e.clientX - contextMenuAttr.width;
    }
    setContextMenu({
      position: {
        x,
        y,
      },
      toggled: true,
      item: favoriteCity,
    });
  };

  return (
    <div className='d-md-flex m-2'>
      <div className='mx-2'>
        <div>
          <h4 className='text-center'>Favorite cities</h4>
          <div className='d-flex flex-column gap-1'>
            {favoriteCities.length === 0 ? (
              <strong className='text-center'>No saved cities</strong>
            ) : (
              favoriteCities.map((favoriteCity) => (
                <FavoriteCity
                  handleContextMenu={(e) => handleContextMenu(e, favoriteCity)}
                  getCurrentWeatherData={getCurrentWeatherData}
                  getHistoricalWeatherData={getHistoricalWeatherData}
                  getForecastData={getForecastData}
                  historyDate={historyDate}
                  favoriteCity={favoriteCity}
                  key={favoriteCity.id}
                />
              ))
            )}
          </div>
          <ContextMenu
            contextMenuRef={contextMenuRef}
            isToggled={contextMenu.toggled}
            positionX={contextMenu.position.x}
            positionY={contextMenu.position.y}
            rightClickItem={contextMenu.item}
            buttons={[
              {
                text: 'Delete',
                onClick: (_, city) => {
                  if (city) deleteFavoriteCity(city.id);
                },
              },
            ]}
          />
        </div>
        <h4 className='mt-5 text-center'>Add city</h4>
        <Form
          onSubmit={createFavoriteCity}
          className='mb-5 d-flex flex-column align-items-center justify-content-center'
        >
          <Form.Group className='mb-3'>
            <Form.Control
              id='city'
              type='text'
              placeholder='Enter city'
              value={favoriteCityName}
              onChange={(e) => setFavoriteCityName(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='px-4'>
            Add
          </Button>
        </Form>
      </div>
      <div className='w-100 d-flex justify-content-center'>
        <div className='w-100 d-flex flex-column align-items-center'>
          <div className='d-flex gap-2'>
            <Button
              onClick={() => setTabIndex(0)}
              variant={`${tabIndex === 0 ? 'info' : 'outline-info'}`}
            >
              Current
            </Button>
            <Button
              onClick={() => setTabIndex(1)}
              variant={`${tabIndex === 1 ? 'info' : 'outline-info'}`}
            >
              Current
            </Button>
            <Button
              onClick={() => setTabIndex(2)}
              variant={`${tabIndex === 2 ? 'info' : 'outline-info'}`}
            >
              Historical
            </Button>
          </div>
          {tabIndex === 0 && (
            <CurrentWeather
              currentWeatherData={currentWeatherData}
              style={currentWeatherStyles}
            />
          )}
          {tabIndex === 1 && <Forecast data={forecastData} />}
          {tabIndex === 2 && (
            <div className='mt-3 w-100 d-flex flex-column align-items-center'>
              <Form.Group className='mb-3'>
                <Form.Control
                  type='date'
                  id='datemin'
                  name='datemin'
                  min={getMinDate().toISOString().split('T')[0]}
                  max={new Date().toISOString().split('T')[0]}
                  value={historyDate}
                  onChange={(e) => setHistoryDate(e.target.value)}
                  placeholder='Enter a date'
                />
              </Form.Group>
              <HistoricalWheater data={historicalWeatherData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoricalData;
