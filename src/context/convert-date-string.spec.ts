import { convertDateString } from './convert-date-string';

describe('convertDateString test suite', () => {
  it('should return the correct date string', () => {
    const date = new Date('2021-01-01T00:00:00');
    expect(convertDateString(date)).toBe('1 Jan 2021 12:00:00 AM');
  });
});
