import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import LoginForm from '../../src/components/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

const onSubmit = vi.fn();
const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });

beforeEach(() => {
  const {} = render(
    <BrowserRouter>
      <LoginForm client={client} />
    </BrowserRouter>
  );
  onSubmit.mockClear();
});

describe('Home', () => {
  it('Should render form elements.', () => {
    render(
      <BrowserRouter>
        <LoginForm client={client} onSubmitForTest={onSubmit}  />
      </BrowserRouter>
    );
    // expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    const inputElements = screen.getAllByRole('textbox');
    inputElements.forEach((input) => {
      expect(input).toBeInTheDocument();
    });
  });
});
