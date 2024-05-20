import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HistoricalData from '../../src/pages/HistoricalData';

describe('group', () => {
  it('should', () => {
    render(<HistoricalData />);
  });
});
