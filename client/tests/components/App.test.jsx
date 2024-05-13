import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/vitest';
import CustomNavbar from '../../src/components/CustomNavbar';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from '../../src/App';

describe('App', () => {
  it('renders without crashing', () => {
    // Render the App component inside BrowserRouter
    createRoot(document.createElement('div')).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
