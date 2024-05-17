import React from 'react';
import { Table } from 'react-bootstrap';

const styles = { width: '75%' };

const HistoricalWheater = ({ data }) => {
  return (
    <div className='weather-container' style={styles}>
      {data && (
        <>
          <div className='d-flex justify-content-between'>
            <h4>{data.location.name}</h4>
            <h4>{data.forecast.forecastday[0].date}</h4>
          </div>
          <h6>{data.location.country}</h6>
          <div className='d-flex justify-content-start align-items-center gap-3'>
            <Table striped bordered hover size='sm'>
              <tbody>
                <tr>
                  <td>Max temp</td>
                  <td>{data.forecast.forecastday[0].day.maxtemp_c}&deg;</td>
                </tr>
                <tr>
                  <td>Min temp</td>
                  <td>{data.forecast.forecastday[0].day.mintemp_c}&deg;</td>
                </tr>
                <tr>
                  <td>Avg temp</td>
                  <td>{data.forecast.forecastday[0].day.avgtemp_c}&deg;</td>
                </tr>
                <tr>
                  <td>Max wind</td>
                  <td>{data.forecast.forecastday[0].day.maxwind_mph}&deg;</td>
                </tr>
                <tr>
                  <td>Avg humidity</td>
                  <td>{data.forecast.forecastday[0].day.avghumidity}&deg;</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className='d-flex align-items-center gap-3'>
            <h6>{data.forecast.forecastday[0].day.condition.text}</h6>
            <img src={data.forecast.forecastday[0].day.condition.icon} alt='' />
          </div>
          <div className=' d-flex flex-column'>
            <strong>
              Sunrise: {data.forecast.forecastday[0].astro.sunrise}
            </strong>
            <strong>Sunset: {data.forecast.forecastday[0].astro.sunset}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoricalWheater;
