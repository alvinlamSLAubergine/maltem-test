import { fireEvent, render } from '@testing-library/react';
import { useBanking } from '../../context';
import { TransactionConsole } from './transaction-console';

jest.mock('../../context');
const mockUseBanking = useBanking as jest.Mock;
const mockDeposit = jest.fn();
const mockWithdraw = jest.fn();
const mockChangeScreen = jest.fn();

describe('TransactionConsole test suite', () => {
  it('should render the transaction console component', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'deposit',
    });

    const { getByTestId } = render(<TransactionConsole />);
    expect(getByTestId('transaction-console')).toBeInTheDocument();
  });

  it('should not render the transaction console component when current page is incorrect', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'landing',
    });

    const { queryByTestId } = render(<TransactionConsole />);
    expect(queryByTestId('transaction-console')).not.toBeInTheDocument();
  });

  it('should set form error when no amount is entered', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'deposit',
      deposit: jest.fn(),
    });

    const { getByText, getByTestId } = render(<TransactionConsole />);
    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(getByTestId('typography-subtitle-error')).toHaveTextContent('Please enter a valid amount.');
  });

  it('should call deposit when amount is entered and confirm button is clicked', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'deposit',
      deposit: mockDeposit,
    });

    const { getByText, getByTestId } = render(<TransactionConsole />);
    const confirmButton = getByText('Confirm');
    const input = getByTestId('transaction-console-input');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(confirmButton);

    expect(mockDeposit).toHaveBeenCalledWith(100);
  });

  it('should call withdraw when amount is entered and confirm button is clicked', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'withdraw',
      withdraw: mockWithdraw,
    });

    const { getByText, getByTestId } = render(<TransactionConsole />);
    const confirmButton = getByText('Confirm');
    const input = getByTestId('transaction-console-input');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(confirmButton);

    expect(mockWithdraw).toHaveBeenCalledWith(100);
  });

  it('should change screen to landing when Cancel button is clicked', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'deposit',
      changeScreen: mockChangeScreen,
    });

    const { getByText } = render(<TransactionConsole />);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockChangeScreen).toHaveBeenCalledWith('landing');
  });
});
