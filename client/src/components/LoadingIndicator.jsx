import React from "react";

const LoadingIndicator = () => {
  return (
    <div data-testid="loading-container" className='loading-container'>
      <div className='loader'></div>
    </div>
  );
};

export default LoadingIndicator;
