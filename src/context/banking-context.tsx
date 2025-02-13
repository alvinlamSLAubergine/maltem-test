import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { Transaction } from '../types';

interface BankingState {
  currentScreen: 'landing' | 'withdraw' | 'deposit' | 'print' | 'quit';
  transactions: Transaction[];
  currentBalance: number;
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
  const [state, dispatch] = useReducer(bankingReducer, {
    currentScreen: 'landing',
    transactions: [],
    currentBalance: 0,
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
  const { amount = 0, screen = 'landing' } = action;

  switch (action.type) {
    case 'withdraw':
      return {
        ...state,
        transactions: [
          ...transactions,
          {
            id: transactions.length.toString(),
            date: new Date().toLocaleString(),
            amount: -amount,
            balance: currentBalance - amount,
          },
        ],
        currentBalance: currentBalance - amount,
      };
    case 'deposit':
      return {
        ...state,
        transactions: [
          ...transactions,
          {
            id: transactions.length.toString(),
            date: new Date().toISOString(),
            amount: amount,
            balance: currentBalance + amount,
          },
        ],
        currentBalance: currentBalance + amount,
      };
    case 'screen':
      return {
        ...state,
        currentScreen: screen,
      };
    default:
      return state;
  }
}
