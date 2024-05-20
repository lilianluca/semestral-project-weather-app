import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Forecast from '../../src/components/Forecast';

const data = {
  location: {
    name: 'Test City',
    country: 'Test Country',
  },
  forecast: {
    forecastday: [
      {
        date: '2024-05-20',
        day: {
          daily_chance_of_rain: 50,
          condition: {
            icon: 'test-icon-url',
          },
          maxtemp_c: 25,
          mintemp_c: 15,
        },
      },
      {
        date: '2024-05-21',
        day: {
          daily_chance_of_rain: 20,
          condition: {
            icon: 'test-icon-url',
          },
          maxtemp_c: 28,
          mintemp_c: 18,
        },
      },
    ],
  },
};

describe('group', () => {
  it('should', () => {
    render(<Forecast data={data} />);
    expect(screen.getByText('Test City')).toBeInTheDocument();
  });
  it('should', () => {
    render(<Forecast data={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
