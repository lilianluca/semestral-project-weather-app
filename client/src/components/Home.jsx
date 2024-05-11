import React from 'react';

const Home = ({ currentUser }) => {
  return (
    <div>
      <h1>Home</h1>
      {currentUser && (
        <div className='center'>
          <h2>You're logged in!</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
