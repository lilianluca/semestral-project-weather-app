import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import HistoricalWheater from '../../src/components/HistoricalWheater';

const sampleData = {
  location: {
    name: 'New York',
    country: 'United States',
  },
  forecast: {
    forecastday: [
      {
        date: '2024-05-18',
        day: {
          maxtemp_c: 25,
          mintemp_c: 15,
          avgtemp_c: 20,
          maxwind_mph: 10,
          avghumidity: 50,
          condition: {
            text: 'Sunny',
            icon: 'sunny.png',
          },
        },
        astro: {
          sunrise: '06:00',
          sunset: '18:00',
        },
      },
    ],
  },
};

describe('group', () => {
  it('should', () => {
    render(<HistoricalWheater data={sampleData} />);
    const locationNameHeading = screen.getByText('New York');
    expect(locationNameHeading).toBeInTheDocument();
  });
});
