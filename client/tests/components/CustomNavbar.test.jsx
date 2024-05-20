import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomNavbar from '../../src/components/CustomNavbar';
import { BrowserRouter } from 'react-router-dom';

describe('group', () => {
  it('should', () => {
    render(
      <BrowserRouter>
        <CustomNavbar isAuthorized={false} />
      </BrowserRouter>
    );
    const registerLink = screen.getByText('Register');
    expect(registerLink).toBeInTheDocument();
    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
  });

  it('should', () => {
    render(
      <BrowserRouter>
        <CustomNavbar isAuthorized={true} />
      </BrowserRouter>
    );
    const logoutBtn = screen.getByText('Log out');
    expect(logoutBtn).toBeInTheDocument();
    localStorage.setItem('token', JSON.stringify('token'));
    let localStorageFirstItem = localStorage.key(0);
    expect(localStorageFirstItem).toBe('token');
    fireEvent.click(logoutBtn);
    localStorageFirstItem = localStorage.key(0);
    expect(localStorageFirstItem).toBeNull();
  });
});
