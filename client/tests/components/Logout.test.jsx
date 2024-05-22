import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Logout from '../../src/components/Logout';
import { BrowserRouter } from 'react-router-dom';

describe('group', () => {
  it('should', () => {
    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );
  });
});
