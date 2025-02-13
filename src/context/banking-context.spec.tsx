import { render } from '@testing-library/react';
import { act } from 'react';
import { BankingProvider, useBanking } from './banking-context';

const TestChild = () => {
  const { currentScreen, currentBalance, transactions, withdraw, deposit, changeScreen } = useBanking();

  return (
    <div>
      <button onClick={() => deposit(200)}>Deposit</button>
      <button onClick={() => withdraw(100)}>Withdraw</button>
      <button onClick={() => changeScreen('print')}>Screen</button>
      <div data-testid='screen'>{currentScreen}</div>
      <div data-testid='balance'>{currentBalance}</div>
      <div data-testid='transactions'>{transactions.length}</div>
    </div>
  );
};

const TestComponent = () => {
  return (
    <BankingProvider>
      <TestChild />
    </BankingProvider>
  );
};

describe('BankingContext test suite', () => {
  it('should provide the context with the default values', () => {
    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('screen')).toHaveTextContent('landing');
    expect(getByTestId('balance')).toHaveTextContent('0');
    expect(getByTestId('transactions')).toHaveTextContent('0');
  });

  it('should allow depositing and withdrawing money', () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    expect(getByTestId('balance')).toHaveTextContent('0');

    act(() => {
      getByText('Deposit').click();
    });
    expect(getByTestId('balance')).toHaveTextContent('200');

    act(() => {
      getByText('Withdraw').click();
    });
    expect(getByTestId('balance')).toHaveTextContent('100');
  });

  it('should allow changing the screen', () => {
    const { getByText, getByTestId } = render(<TestComponent />);

    expect(getByTestId('screen')).toHaveTextContent('landing');

    act(() => {
      getByText('Screen').click();
    });
    expect(getByTestId('screen')).toHaveTextContent('print');
  });
});
