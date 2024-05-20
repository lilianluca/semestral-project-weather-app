import { describe, it, expect } from 'vitest';
import getDayName from '../../src/utils/functions/getDayName';

describe('getDayName', () => {
  it('should return the correct day name for a valid date', () => {
    expect(getDayName('2024-05-20')).toBe('Monday');
    expect(getDayName('2023-12-25')).toBe('Monday');
    expect(getDayName('2024-01-01')).toBe('Monday');
    expect(getDayName('2024-02-29')).toBe('Thursday');
  });

  it('should return an invalid date for an invalid date string', () => {
    expect(getDayName('invalid-date')).toBe(undefined);
    expect(getDayName('2024-13-01')).toBe(undefined);
  });

  it('should return the correct day name for a date object', () => {
    expect(getDayName(new Date(2024, 4, 20))).toBe('Monday');
    expect(getDayName(new Date(2023, 11, 25))).toBe('Monday');
  });
});
