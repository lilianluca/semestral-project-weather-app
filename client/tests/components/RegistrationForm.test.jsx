import React from 'react';
import '@testing-library/jest-dom/vitest';
import { it, expect, describe } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationForm from '../../src/components/RegistrationForm';
import { server } from '../mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';
import '@testing-library/jest-dom';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RegistrationForm', () => {
  it('Should render form elements.', () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    const inputElements = screen.getAllByRole('textbox');
    inputElements.forEach((input) => {
      expect(input).toBeInTheDocument();
    });
  });
  it('should register a user', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/submit/i))
  });
});
