import { render } from '@testing-library/react';
import { IconButton } from './icon-button';

jest.mock('../../assets/dark-icon.svg', () => ({
  ReactComponent: () => <div>DarkIcon</div>,
}));
jest.mock('../../assets/light-icon.svg', () => ({
  ReactComponent: () => <div>LightIcon</div>,
}));

describe('IconButton test suite', () => {
  it('should render the button with correct icon and onClick callback', () => {
    const mockClick = jest.fn();
    const { getByText, getByTestId } = render(
      <IconButton
        icon='light'
        onClick={mockClick}
      />
    );

    expect(getByText('LightIcon')).toBeInTheDocument();

    const button = getByTestId('icon-button');
    button.click();
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should render the button with dark icon', () => {
    const { getByText } = render(
      <IconButton
        icon='dark'
        onClick={() => {}}
      />
    );

    expect(getByText('DarkIcon')).toBeInTheDocument();
  });
});
