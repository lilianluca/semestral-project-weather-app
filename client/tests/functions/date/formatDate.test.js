import { describe, it, expect, vi } from 'vitest';
import formatDate from '../../../src/utils/functions/date/formatDate';

describe('group', () => {
  it('should', () => {
    const date = new Date('2024-05-21T05:00:08');
    console.log(date);
    expect(formatDate(date)).toBe('2024-05-21');
  });
  it('should', () => {
    const date = new Date('2024-05-21');
    console.log(date);
    expect(formatDate(date)).toBe('2024-05-21');
  });
});
