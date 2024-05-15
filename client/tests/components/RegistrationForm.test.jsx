import React from 'react';
import '@testing-library/jest-dom/vitest';
import { it, expect, describe } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationForm from '../../src/components/RegistrationForm';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';

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
});
