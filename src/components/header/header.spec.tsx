import { render } from '@testing-library/react';
import { useBanking } from '../../context';
import { Header } from './header';

jest.mock('../../context');
const mockUseBanking = useBanking as jest.Mock;

describe('Header test suite', () => {
  it('should render the header component', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'landing',
    });

    const { getByTestId } = render(<Header />);

    const headerPrimary = getByTestId('typography-large-purple');
    const headerSecondary = getByTestId('typography-normal-secondary');

    expect(headerPrimary).toBeInTheDocument();
    expect(headerSecondary).toBeInTheDocument();

    expect(headerPrimary).toHaveTextContent('Welcome to AwesomeGIC Bank!');
    expect(headerSecondary).toHaveTextContent('What would you like to do?');
  });

  it('should render the correct deposit header', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'deposit',
    });

    const { getByTestId } = render(<Header />);

    const headerPrimary = getByTestId('typography-large-purple');
    const headerSecondary = getByTestId('typography-normal-secondary');

    expect(headerPrimary).toHaveTextContent('Deposit Money');
    expect(headerSecondary).toHaveTextContent('Please enter the amount to deposit:');
  });

  it('should render the correct withdraw header', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'withdraw',
    });

    const { getByTestId } = render(<Header />);

    const headerPrimary = getByTestId('typography-large-purple');
    const headerSecondary = getByTestId('typography-normal-secondary');

    expect(headerPrimary).toHaveTextContent('Withdraw Money');
    expect(headerSecondary).toHaveTextContent('Please enter the amount to withdraw:');
  });

  it('should render the correct quit header', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'quit',
    });

    const { getByTestId } = render(<Header />);

    const headerPrimary = getByTestId('typography-large-purple');
    const headerSecondary = getByTestId('typography-normal-secondary');

    expect(headerPrimary).toHaveTextContent('Thank you for banking with AwesomeGIC Bank.');
    expect(headerSecondary).toHaveTextContent('Have a nice day!');
  });

  it('should display the last transaction details', () => {
    mockUseBanking.mockReturnValue({
      currentScreen: 'landing',
      recentTransaction: {
        type: 'deposit',
        amount: 100,
      },
    });

    const { getByTestId, getAllByTestId } = render(<Header />);

    const headerPrimary = getByTestId('typography-large-purple');
    const headerSecondaries = getAllByTestId('typography-normal-secondary');

    expect(headerPrimary).toHaveTextContent('Welcome to AwesomeGIC Bank!');
    expect(headerSecondaries[0]).toHaveTextContent('Thank you. $100.00 has been deposited to your account.');
    expect(headerSecondaries[1]).toHaveTextContent("Is there anything else you'd like to do?");
  });
});
