import React from 'react';
import '@testing-library/jest-dom';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContextMenu from '../../src/components/ContextMenu';

describe('group', () => {
  const deleteFavoriteCity = vi.fn();
  const contextMenuRef = vi.fn();
  it('should', () => {
    render(
      <ContextMenu
        rightClickItem={{ item: 'item' }}
        positionX={2}
        positionY={4}
        isToggled={false}
        buttons={[
          {
            text: 'Delete',
            onClick: (_, city) => {
              if (city) deleteFavoriteCity(city.id);
            },
          },
        ]}
        contextMenuRef={contextMenuRef}
      />
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
