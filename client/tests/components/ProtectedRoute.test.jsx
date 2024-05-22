import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../src/components/ProtectedRoute';

describe('group', () => {
  const setIsAuthorized = vi.fn();
  it('should', () => {
    render(
      <BrowserRouter>
        <ProtectedRoute isAuthorized={null} setIsAuthorized={setIsAuthorized}>
          <div>This is protected route</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  it('should', () => {
    render(
      <BrowserRouter>
        <ProtectedRoute isAuthorized={true} setIsAuthorized={setIsAuthorized}>
          <div>This is protected route</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
    const loading = screen.getByText('This is protected route');
    expect(loading).toBeInTheDocument();
  });

  
});
