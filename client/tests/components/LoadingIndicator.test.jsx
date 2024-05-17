import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../../src/components/LoadingIndicator';
import React from 'react';
import '@testing-library/jest-dom';

describe('group', () => {
  it('should', () => {
    render(<LoadingIndicator />);
    const loadingContainer = screen.getByTestId('loading-container');
    expect(loadingContainer).toBeInTheDocument();
    
  });
});
