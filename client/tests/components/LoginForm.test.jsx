import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import LoginForm from '../../src/components/LoginForm';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
  it('Should render form elements.', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    const inputElements = screen.getAllByRole('textbox');
    inputElements.forEach((input) => {
      expect(input).toBeInTheDocument();
    });
  });
});
