import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HistoricalData from '../../src/pages/HistoricalData';

describe('group', () => {
  it('should', () => {
    render(<HistoricalData />);
  });
  it('should', () => {
    const mockSubmit = vi.fn();
    render(<HistoricalData onSubmit={mockSubmit} />);

    const cityInput = screen.getByTestId('favoriteCityName');
    fireEvent.change(cityInput, { target: { value: 'London' } });
    const submitButton = screen.getByRole('button', { name: /Add/i });
    fireEvent.submit(submitButton);
  });
  it('should', () => {
    const { getByText } = render(<HistoricalData />);
    fireEvent.click(getByText('Delete'));
  });
});
