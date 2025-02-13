import { Transaction } from '../../types';
import { generateLandingSubtitle, generateLandingSubtitleRow2 } from './generate-subtitles';

const mockDepositTransaction: Transaction = {
  type: 'deposit',
  amount: 100,
  id: '',
  date: '',
  balance: 0,
};

const mockWithdrawTransaction: Transaction = {
  type: 'withdraw',
  amount: 50,
  id: '',
  date: '',
  balance: 0,
};

describe('generateLandingSubtitle test suite', () => {
  it('should return the correct subtitle when the last transaction was a deposit', () => {
    expect(generateLandingSubtitle(mockDepositTransaction)).toBe(
      'Thank you. $100.00 has been deposited to your account.'
    );
  });

  it('should return the correct subtitle when the last transaction was a withdraw', () => {
    expect(generateLandingSubtitle(mockWithdrawTransaction)).toBe('Thank you. $50.00 has been withdrawn.');
  });

  it('should return the default subtitle when there is no last transaction', () => {
    expect(generateLandingSubtitle()).toBe('What would you like to do?');
  });
});

describe('generateLandingSubtitleRow2 test suite', () => {
  it('should return the correct subtitle when there is a last transaction', () => {
    expect(generateLandingSubtitleRow2(mockDepositTransaction)).toBe("Is there anything else you'd like to do?");
    expect(generateLandingSubtitleRow2(mockWithdrawTransaction)).toBe("Is there anything else you'd like to do?");
  });

  it('should return an empty string when there is no last transaction', () => {
    expect(generateLandingSubtitleRow2()).toBe('');
  });
});
