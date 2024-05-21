import { describe, it, expect, vi } from 'vitest';
import getMinDate from '../../../src/utils/functions/date/getMinDate';
import formatDate from '../../../src/utils/functions/date/formatDate';

describe('getMinDate', () => {
  it('should return the date 7 days ago from today', () => {
    // Mocking Date
    const mockToday = new Date(2024, 4, 21); // Mocking May 21, 2024
    const originalDate = global.Date;
    global.Date = vi.fn(() => mockToday);
    const result = getMinDate();
    const expectedDate = new Date(2024, 4, 14); // May 14, 2024
    expect(formatDate(result)).toBe(formatDate(expectedDate));
    // Restore original Date
    global.Date = originalDate;
  });
});
