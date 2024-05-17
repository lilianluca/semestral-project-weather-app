import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegisterAndLogout from '../../src/components/RegisterAndLogout';
import { BrowserRouter } from 'react-router-dom';

describe('group', () => {
  it('should', () => {
    render(
      <BrowserRouter>
        <RegisterAndLogout />
      </BrowserRouter>
    );
    screen.debug();
    const registerHeading = screen.getByText('Register'); 
    expect(registerHeading).toBeInTheDocument();
  });
});
