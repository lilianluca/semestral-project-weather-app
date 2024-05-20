import { it, expect, describe } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import CustomForm from '../../src/components/CustomForm';
import { BrowserRouter } from 'react-router-dom';

describe('group', () => {
  it('should', () => {
    render(
      <BrowserRouter>
        <CustomForm method='login' route='route' />
      </BrowserRouter>
    );
    const customForm = screen.getByTestId('custom-form-username');
    expect(customForm).toBeInTheDocument();

    const customFormUsername = screen.getByTestId('custom-form-username');
    expect(customFormUsername).toBeInTheDocument();
    expect(customFormUsername.value).toBe('');
    fireEvent.change(customFormUsername, { target: { value: 'new_username' } });
    expect(customFormUsername.value).toBe('new_username');

    const customFormPassword = screen.getByTestId('custom-form-password');
    expect(customFormPassword).toBeInTheDocument();
    expect(customFormPassword.value).toBe('');
    fireEvent.change(customFormPassword, {
      target: { value: 'new_password1' },
    });
    expect(customFormPassword.value).toBe('new_password1');

    const customFormSubmitBtn = screen.getByTestId('custom-form-submit-btn');
    expect(customFormSubmitBtn).toBeInTheDocument();
    fireEvent.click(customFormSubmitBtn);
  });
});
