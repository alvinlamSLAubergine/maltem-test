import { render } from '@testing-library/react';
import { Options } from './options';

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

describe('Options test suite', () => {
  it('should render all option buttons', () => {
    const { getByTestId } = render(<Options />);

    expect(getByTestId('withdraw-options-button')).toBeInTheDocument();
    expect(getByTestId('deposit-options-button')).toBeInTheDocument();
    expect(getByTestId('print-options-button')).toBeInTheDocument();
    expect(getByTestId('quit-options-button')).toBeInTheDocument();
  });
});
