import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../src/components/Home';
import axios from 'axios';
import '@testing-library/jest-dom/vitest';

describe('Home', () => {
  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });
  it('Should render "You are logged in!" when currentUser is true.', () => {
    render(<Home client={client} currentUser={true} />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
});
