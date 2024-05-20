import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ForecastDay from '../../src/components/ForecastDay';

describe('group', () => {
  it('should', () => {
    render(
      <ForecastDay
        date={'Monday'}
        dailyChanceOfRain={75}
        iconConditionUrl={'http://test.url'}
        maxTemp={14.2}
        minTemp={10.2}
      />
    );
    expect(screen.getByText('Monday')).toBeInTheDocument();
  });
});
