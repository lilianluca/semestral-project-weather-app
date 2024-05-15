import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrentWeather from '../../src/components/CurrentWeather';

// Mock weather data
const mockWeatherData = {
  location: {
    name: 'Liberec',
    country: 'Czech Republic',
    localtime: '2024-05-15 12:00',
  },
  current: {
    temp_c: 25,
    feelslike_c: 26,
    condition: {
      text: 'Sunny',
      icon: 'sunny.jpg',
    },
  },
};

// Mock axios client
const mockClient = {
  get: vi.fn().mockResolvedValue({ data: mockWeatherData }), // Provide mock data here
};

describe('CurrentWeather component', () => {
  it('should render the city name and initial temperature', async () => {
    const { getByLabelText, getByText } = render(
      <CurrentWeather client={mockClient} />
    );

    // Simulate user input and form submission
    const cityInput = getByLabelText('City');
    fireEvent.change(cityInput, { target: { value: 'Liberec' } });
    fireEvent.submit(cityInput.closest('form'));

    // Wait for data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Liberec'));
    });
  });
});
