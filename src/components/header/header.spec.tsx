import { render } from '@testing-library/react';
import { Header } from './header';

describe('Header test suite', () => {
  it('should render the header component', () => {
    const { getByTestId } = render(<Header />);

    const headerPrimary = getByTestId('typography-large-purple');
    const headerSecondary = getByTestId('typography-normal-secondary');

    expect(headerPrimary).toBeInTheDocument();
    expect(headerSecondary).toBeInTheDocument();

    expect(headerPrimary).toHaveTextContent('Welcome to AwesomeGIC Bank!');
    expect(headerSecondary).toHaveTextContent('What would you like to do to?');
  });
});
