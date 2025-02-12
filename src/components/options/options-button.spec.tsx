import { render } from '@testing-library/react';
import { OptionsButton } from './options-button';

jest.mock('../../assets/cash-icon.svg', () => ({
  ReactComponent: () => <div>WithdrawIcon</div>,
}));
jest.mock('../../assets/credit-icon.svg', () => ({
  ReactComponent: () => <div>DepositIcon</div>,
}));
jest.mock('../../assets/document-icon.svg', () => ({
  ReactComponent: () => <div>PrintIcon</div>,
}));
jest.mock('../../assets/quit-icon.svg', () => ({
  ReactComponent: () => <div>QuitIcon</div>,
}));

describe('OptionsButton test suite', () => {
  it('should render the button with correct icon and title', () => {
    const { getByText, getByTestId } = render(
      <>
        <OptionsButton option='withdraw' />
        <OptionsButton option='deposit' />
        <OptionsButton option='print' />
        <OptionsButton option='quit' />
      </>
    );

    expect(getByTestId('withdraw-options-button')).toBeInTheDocument();
    expect(getByTestId('withdraw-options-button')).toHaveTextContent('WithdrawIcon');
    expect(getByTestId('withdraw-options-button')).toHaveTextContent('Withdraw');

    expect(getByTestId('deposit-options-button')).toBeInTheDocument();
    expect(getByTestId('deposit-options-button')).toHaveTextContent('DepositIcon');
    expect(getByTestId('deposit-options-button')).toHaveTextContent('Deposit');

    expect(getByTestId('print-options-button')).toBeInTheDocument();
    expect(getByTestId('print-options-button')).toHaveTextContent('PrintIcon');
    expect(getByTestId('print-options-button')).toHaveTextContent('Print Statement');

    expect(getByTestId('quit-options-button')).toBeInTheDocument();
    expect(getByTestId('quit-options-button')).toHaveTextContent('QuitIcon');
    expect(getByTestId('quit-options-button')).toHaveTextContent('Quit');
  });

  it('should call the onClick callback when the button is clicked', () => {
    const mockClick = jest.fn();
    const { getByTestId } = render(
      <OptionsButton
        option='withdraw'
        onClick={mockClick}
      />
    );

    const button = getByTestId('withdraw-options-button');
    button.click();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
