import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { Transaction } from '../types';
import { convertDateString } from './convert-date-string';

interface BankingState {
  currentScreen: 'landing' | 'withdraw' | 'deposit' | 'print' | 'quit';
  transactions: Transaction[];
  currentBalance: number;
  recentTransaction?: Transaction;
}

interface BankingContext extends BankingState {
  withdraw: (amount: number) => void;
  deposit: (amount: number) => void;
  changeScreen: (screen: BankingState['currentScreen']) => void;
}

const BankingContext = createContext<BankingContext>({
  currentScreen: 'landing',
  transactions: [],
  currentBalance: 0,
  withdraw: () => {},
  deposit: () => {},
  changeScreen: () => {},
});

export const useBanking = () => useContext(BankingContext);
export const BankingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[];
  const currentBalance = Number(localStorage.getItem('currentBalance') || '0');

  const [state, dispatch] = useReducer(bankingReducer, {
    currentScreen: 'landing',
    transactions: transactions,
    currentBalance: currentBalance,
  });

  return (
    <BankingContext.Provider
      value={{
        ...state,
        withdraw: (amount: number) => dispatch({ type: 'withdraw', amount }),
        deposit: (amount: number) => dispatch({ type: 'deposit', amount }),
        changeScreen: (screen: BankingState['currentScreen']) => dispatch({ type: 'screen', screen }),
      }}
    >
      {children}
    </BankingContext.Provider>
  );
};

function bankingReducer(
  state: BankingState,
  action: {
    type: 'withdraw' | 'deposit' | 'screen';
    amount?: number;
    screen?: BankingState['currentScreen'];
  }
): BankingState {
  const { transactions, currentBalance } = state;
  const { amount = 0, screen = 'landing', type } = action;

  const transactionAmount = type === 'deposit' ? amount : -amount;
  const transaction: Transaction = {
    id: transactions.length.toString(),
    date: convertDateString(new Date()),
    amount: transactionAmount,
    balance: currentBalance + transactionAmount,
    type: type === 'deposit' ? 'deposit' : 'withdraw',
  };

  switch (action.type) {
    case 'withdraw':
      localStorage.setItem('transactions', JSON.stringify([...transactions, transaction]));
      localStorage.setItem('currentBalance', (currentBalance - amount).toString());
      return {
        ...state,
        transactions: [...transactions, transaction],
        currentBalance: currentBalance - amount,
        recentTransaction: transaction,
        currentScreen: 'landing',
      };
    case 'deposit':
      localStorage.setItem('transactions', JSON.stringify([...transactions, transaction]));
      localStorage.setItem('currentBalance', (currentBalance + amount).toString());
      return {
        ...state,
        transactions: [...transactions, transaction],
        currentBalance: currentBalance + amount,
        recentTransaction: transaction,
        currentScreen: 'landing',
      };
    case 'screen':
      return {
        ...state,
        recentTransaction: undefined,
        currentScreen: screen,
      };
    default:
      return state;
  }
}
