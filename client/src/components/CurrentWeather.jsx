import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const currentWeatherStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  marginTop: '16px',
  backgroundColor: '#b8f8ff',
  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
  borderRadius: '10px',
  padding: '3rem',
};

const getNewWeatherCurrentData = (e, client, city, setCurrentWeatherData) => {
  e.preventDefault();
  client
    .get(`/weather-api/v1/current/${city}`)
    .then(function (res) {
      setCurrentWeatherData(res.data);
      console.log(res.data);
    })
    .catch(function (error) {
      setCurrentWeatherData(null);
    });
};

const CurrentWeather = ({ client }) => {
  const [city, setCity] = useState('Liberec');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);

  useEffect(() => {
    client
      .get(`/weather-api/v1/current/${city}`)
      .then(function (res) {
        setCurrentWeatherData(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        setCurrentWeatherData(null);
      });
  }, []);

  return (
    <>
      <div className='center'>
        <Form
          onSubmit={(e) =>
            getNewWeatherCurrentData(e, client, city, setCurrentWeatherData)
          }
        >
          <Form.Group className='mb-3'>
            <Form.Label>City</Form.Label>
            <Form.Control
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
      </div>
      <div style={currentWeatherStyles}>
        {currentWeatherData && (
          <>
            <h4>{currentWeatherData.location.name}</h4>
            <h6>{currentWeatherData.location.country}&deg;</h6>
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
            {/* <code>{JSON.stringify(currentWeatherData)}</code> */}
          </>
        )}
      </div>
    </>
  );
};

export default CurrentWeather;
