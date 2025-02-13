import { fireEvent, render } from '@testing-library/react';
import { Button } from './button';

describe('Button test suite', () => {
  it('should render the button with the correct text and callback', () => {
    const mockCallback = jest.fn();
    const { getByText } = render(
      <Button
        text='Click me'
        onClick={mockCallback}
      />
    );

    expect(getByText('Click me')).toBeInTheDocument();

    fireEvent.click(getByText('Click me'));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
