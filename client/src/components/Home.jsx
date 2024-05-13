import React from 'react';
import CurrentWeather from './CurrentWeather';

const Home = ({ client, currentUser }) => {
  return (
    <div>
      <CurrentWeather client={client} />
      {currentUser && (
        <div className='center'>
          <h2>You are logged in!</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
