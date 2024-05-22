import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../src/pages/Home';

describe('group', () => {
  it('should', () => {
    const { getByLabelText } = render(<Home />);
    screen.debug();
    const cityInput = getByLabelText('City');
    fireEvent.change(cityInput, { target: { value: 'Prague' } });
    fireEvent.submit(screen.getByTestId('submitHomePage'));
  });
});
