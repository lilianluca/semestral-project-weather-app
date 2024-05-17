import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentWeather from '../../src/components/CurrentWeather';

describe('group', () => {
  it('should', () => {
    render(
      <CurrentWeather
        currentWeatherData={{
          location: {
            name: 'Liberec',
            country: 'Czech republic',
            localtime: '17:00',
          },
          current: {
            temp_c: 14,
            condition: { text: 'Rainy', icon: 'http://test-icon.png' },
            feelslike_c: 12,
          },
        }}
        style={{ width: '100%' }}
      />
    );
    screen.debug();
    const locationNameHeading = screen.getByText('Liberec');
    expect(locationNameHeading).toBeInTheDocument();
  });
});
