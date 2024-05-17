import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../../src/pages/NotFound';

describe('group', () => {
  it('should', () => {
    render(<NotFound />);
    screen.debug();
    const notFoundHeading = screen.getByText('404 Not Found')
    expect(notFoundHeading).toBeInTheDocument()
  });
});
