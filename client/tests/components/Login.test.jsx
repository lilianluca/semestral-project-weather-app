import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../src/pages/Login';
import { BrowserRouter } from 'react-router-dom';

describe('group', () => {
  it('should', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    screen.debug();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
