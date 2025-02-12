import { PropsWithChildren } from 'react';
import styles from './typography.module.css';

interface Props extends PropsWithChildren {
  variant?: 'normal' | 'bold' | 'large' | 'subtitle';
  color?: 'primary' | 'secondary' | 'purple' | 'subtitle' | 'error';
  className?: string;
}

export const Typography: React.FC<Props> = ({ variant = 'normal', color = 'primary', className, children }) => {
  const variantStyle = {
    ['normal']: styles['typography--normal'],
    ['bold']: styles['typography--bold'],
    ['large']: styles['typography--large'],
    ['subtitle']: styles['typography--subtitle'],
  }[variant];

  const colorStyle = {
    ['primary']: styles['typography--color-primary'],
    ['secondary']: styles['typography--color-secondary'],
    ['purple']: styles['typography--color-purple'],
    ['subtitle']: styles['typography--color-subtitle'],
    ['error']: styles['typography--color-error'],
  }[color];

  const _className = `${styles.typography} ${variantStyle} ${colorStyle} ${className}`;

  return (
    <div
      data-testid={`typography-${variant}-${color}`}
      className={_className}
    >
      {children}
    </div>
  );
};
