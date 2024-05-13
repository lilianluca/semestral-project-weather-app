import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/vitest';
import CustomNavbar from '../../src/components/CustomNavbar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('CustomNavbar', () => {
  it('Should render ', () => {
    const { getByText } = render(
      <Router>
        {' '}
        {/* Wrap the component with Router */}
        <CustomNavbar currentUser={false} />
      </Router>
    );
    expect(getByText('Register')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should render logout button when user is logged in', () => {
    const { getByText } = render(
      <Router>
        <CustomNavbar currentUser={true} />
      </Router>
    );
    expect(getByText('Log out')).toBeInTheDocument();
  });
});
