import { render } from '@testing-library/react';
import { act } from 'react';
import { ThemeProvider, useTheme } from './theme-context';

const TestChild = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      data-testid='theme-button'
      onClick={toggleTheme}
    >
      {theme}
    </button>
  );
};

const TestComponent = () => {
  return (
    <ThemeProvider>
      <TestChild />
    </ThemeProvider>
  );
};

describe('ThemeContext test suite', () => {
  it('should provide the context with the default theme', () => {
    const { container, getByTestId } = render(<TestComponent />);
    const themeDiv = container.querySelector('.theme');
    expect(themeDiv).toHaveClass('theme--light');

    const button = getByTestId('theme-button');
    expect(button).toHaveTextContent('light');
  });

  it('should allow toggling the theme', () => {
    const { container, getByTestId } = render(<TestComponent />);

    const button = getByTestId('theme-button');
    expect(button).toHaveTextContent('light');
    act(() => {
      button.click();
    });

    const themeDiv = container.querySelector('.theme');
    expect(themeDiv).toHaveClass('theme--dark');
    expect(button).toHaveTextContent('dark');
  });

  it('should persist the theme in localStorage', () => {
    const { getByTestId } = render(<TestComponent />);

    const theme = localStorage.getItem('theme');
    expect(theme).toBe('dark');
    const button = getByTestId('theme-button');
    expect(button).toHaveTextContent('dark');
  });
});
