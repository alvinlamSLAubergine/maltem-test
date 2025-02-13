import { Transaction } from '../../types';

export function generateLandingSubtitle(lastTransaction?: Transaction) {
  switch (lastTransaction?.type) {
    case 'deposit':
      return `Thank you. $${Math.abs(lastTransaction.amount).toFixed(2)} has been deposited to your account.`;
    case 'withdraw':
      return `Thank you. $${Math.abs(lastTransaction.amount).toFixed(2)} has been withdrawn.`;
    default:
      return 'What would you like to do?';
  }
}

export function generateLandingSubtitleRow2(lastTransaction?: Transaction) {
  if (lastTransaction) {
    return "Is there anything else you'd like to do?";
  }

  return '';
}
