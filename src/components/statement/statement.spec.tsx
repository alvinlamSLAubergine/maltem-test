import { render } from '@testing-library/react';
import { useBanking } from '../../context';
import { Transaction } from '../../types';
import { Statement } from './statement';

const mockTransactions: Transaction[] = [
  {
    type: 'deposit',
    amount: 100,
    id: '1',
    date: '1 Aug 2021 00:00:00 AM',
    balance: 900,
  },
  {
    type: 'withdraw',
    amount: 50,
    id: '2',
    date: '2 Aug 2021 00:00:00 AM',
    balance: 850,
  },
];

jest.mock('../../context');
const mockUseBanking = useBanking as jest.Mock;

describe('Statement test suite', () => {
  it('should render statement table', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'print',
      transactions: mockTransactions,
    });

    const { getByText } = render(<Statement />);

    expect(getByText('Date')).toBeInTheDocument();
    expect(getByText('Amount')).toBeInTheDocument();
    expect(getByText('Balance')).toBeInTheDocument();

    expect(getByText('1 Aug 2021 00:00:00 AM')).toBeInTheDocument();
    expect(getByText('100.00')).toBeInTheDocument();
    expect(getByText('900.00')).toBeInTheDocument();

    expect(getByText('2 Aug 2021 00:00:00 AM')).toBeInTheDocument();
    expect(getByText('50.00')).toBeInTheDocument();
    expect(getByText('850.00')).toBeInTheDocument();
  });

  it('should render no transactions message', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'print',
      transactions: [],
    });

    const { getByText } = render(<Statement />);

    expect(getByText('No transactions')).toBeInTheDocument();
  });

  it('should not render statement table if currentScreen is incorrect', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'landing',
    });

    const { queryByText } = render(<Statement />);

    expect(queryByText('Date')).not.toBeInTheDocument();
    expect(queryByText('Amount')).not.toBeInTheDocument();
    expect(queryByText('Balance')).not.toBeInTheDocument();
  });

  it('should return to landing screen when back button is clicked', () => {
    const mockChangeScreen = jest.fn();
    mockUseBanking.mockReturnValue({
      currentScreen: 'print',
      transactions: mockTransactions,
      changeScreen: mockChangeScreen,
    });

    const { getByText } = render(<Statement />);

    getByText('Back').click();

    expect(mockChangeScreen).toHaveBeenCalledWith('landing');
  });
});
