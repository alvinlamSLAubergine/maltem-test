import { render } from '@testing-library/react';
import { Typography } from './typography';

const variants = ['normal', 'bold', 'large', 'subtitle'];
const colors = ['primary', 'secondary', 'purple', 'subtitle', 'error'];

describe('Typography test suite', () => {
  it('should render the default typography', () => {
    const { getByTestId } = render(<Typography />);

    const typography = getByTestId('typography-normal-primary');
    expect(typography).toHaveClass('typography');
    expect(typography).toHaveClass('typography--normal');
    expect(typography).toHaveClass('typography--color-primary');
  });

  it('should render the correct variants', () => {
    const { getByTestId } = render(
      <>
        <Typography variant='bold'>Bold</Typography>
        <Typography variant='large'>Large</Typography>
        <Typography variant='subtitle'>Subtitle</Typography>
      </>
    );

    const bold = getByTestId('typography-bold-primary');
    const large = getByTestId('typography-large-primary');
    const subtitle = getByTestId('typography-subtitle-primary');

    expect(bold).toHaveTextContent('Bold');
    expect(large).toHaveTextContent('Large');
    expect(subtitle).toHaveTextContent('Subtitle');
  });

  it('should render the correct colors', () => {
    const { getByTestId } = render(
      <>
        <Typography color='secondary'>Secondary</Typography>
        <Typography color='purple'>Purple</Typography>
        <Typography color='subtitle'>Subtitle</Typography>
        <Typography color='error'>Error</Typography>
      </>
    );

    const secondary = getByTestId('typography-normal-secondary');
    const purple = getByTestId('typography-normal-purple');
    const subtitle = getByTestId('typography-normal-subtitle');
    const error = getByTestId('typography-normal-error');

    expect(secondary).toHaveTextContent('Secondary');
    expect(purple).toHaveTextContent('Purple');
    expect(subtitle).toHaveTextContent('Subtitle');
    expect(error).toHaveTextContent('Error');
  });
});
