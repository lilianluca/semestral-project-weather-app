import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../api';
import CurrentWeather from '../components/CurrentWeather';

const currentWeatherStyles = { maxWidth: '600px', margin: '0 auto' };

const Home = () => {
  const [city, setCity] = useState('Liberec');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);

  useEffect(() => {
    getCurrentWeatherData();
  }, []);

  const getCurrentWeatherData = () => {
    api
      .get(`/weather-api/v1/current/${city}`)
      .then((res) => res.data)
      .then((data) => {
        setCurrentWeatherData(data);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Form
        className='my-2 d-flex flex-column align-items-center justify-content-center'
        onSubmit={(e) => {
          e.preventDefault();
          getCurrentWeatherData(city);
        }}
      >
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='city'>City</Form.Label>
          <Form.Control
            id='city'
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <CurrentWeather
        currentWeatherData={currentWeatherData}
        style={currentWeatherStyles}
      />
    </>
  );
};

export default Home;
