export type Transaction = {
  id: string;
  date: string;
  amount: number;
  balance: number;
  type: 'withdraw' | 'deposit';
};
