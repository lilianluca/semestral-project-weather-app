import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteCity from '../../src/components/FavoriteCity';

describe('group', () => {
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
});
