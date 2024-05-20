import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('group', () => {
  it('should', () => {
    render(<App />);
    const weatherAppLink = screen.getByText('Weather App');
    expect(weatherAppLink).toBeInTheDocument();
  });
});
