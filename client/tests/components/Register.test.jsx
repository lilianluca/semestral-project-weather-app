import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Register from '../../src/pages/Register';
import { BrowserRouter } from 'react-router-dom';

describe('group', () => {
  it('should', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const registerHeading = screen.getByText('Register');
    expect(registerHeading).toBeInTheDocument();
  });
});
