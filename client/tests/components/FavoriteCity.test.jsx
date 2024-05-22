import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteCity from '../../src/components/FavoriteCity';

describe('group', () => {
  const favoriteCity = {
    city_name: 'Test City',
    // Add other properties as needed for your tests
  };

  const mockHandleContextMenu = vi.fn();
  const mockGetCurrentWeatherData = vi.fn();
  const mockGetHistoricalWeatherData = vi.fn();
  const mockGetForecastData = vi.fn();

  it('should', () => {
    const handleContextMenu = vi.fn();
    const getCurrentWeatherData = vi.fn();
    const getHistoricalWeatherData = vi.fn();
    const getForecastData = vi.fn();
    const historyDate = '2024-05-17';
    render(
      <FavoriteCity
        favoriteCity={{ city_name: 'Liberec' }}
        handleContextMenu={handleContextMenu}
        getCurrentWeatherData={getCurrentWeatherData}
        getHistoricalWeatherData={getHistoricalWeatherData}
        getForecastData={getForecastData}
        historyDate={historyDate}
      />
    );
    const submitBtn = screen.getByRole('button');
    fireEvent.click(submitBtn);
    expect(getCurrentWeatherData).toHaveBeenCalledOnce();
  });

  it('should', () => {
    const { getByText } = render(
      <FavoriteCity
        favoriteCity={favoriteCity}
        handleContextMenu={mockHandleContextMenu}
        getCurrentWeatherData={mockGetCurrentWeatherData}
        getHistoricalWeatherData={mockGetHistoricalWeatherData}
        getForecastData={mockGetForecastData}
        historyDate={new Date()}
      />
    );
    screen.debug();
    fireEvent.submit(getByText('Test City'));
    expect(mockGetCurrentWeatherData).toHaveBeenCalledWith('Test City');
    expect(mockGetHistoricalWeatherData).toHaveBeenCalledWith(
      'Test City',
      expect.any(Date)
    );
    expect(mockGetForecastData).toHaveBeenCalledWith('Test City');
  });
  it('should', () => {
    const { getByText } = render(
      <FavoriteCity
        favoriteCity={favoriteCity}
        handleContextMenu={mockHandleContextMenu}
        getCurrentWeatherData={mockGetCurrentWeatherData}
        getHistoricalWeatherData={mockGetHistoricalWeatherData}
        getForecastData={mockGetForecastData}
        historyDate={new Date()}
      />
    );
    fireEvent.contextMenu(getByText('Test City'));
    expect(mockHandleContextMenu).toHaveBeenCalledWith(
      expect.any(Object), // MouseEvent object
      favoriteCity
    );
  });
});
