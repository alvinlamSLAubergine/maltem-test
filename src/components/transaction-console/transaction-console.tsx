import { useCallback, useRef, useState } from 'react';
import { useBanking } from '../../context';
import { Button } from '../button';
import { Typography } from '../typography';
import styles from './transaction-console.module.css';

export const TransactionConsole: React.FC = () => {
  const [formError, setFormError] = useState('');
  const { currentScreen, changeScreen, deposit, withdraw } = useBanking();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(() => {
    if (!inputRef.current?.value) {
      setFormError('Please enter a valid amount.');
    } else {
      const action = currentScreen === 'deposit' ? deposit : withdraw;
      action(parseFloat(inputRef.current.value));
    }
  }, [currentScreen]);

  if (currentScreen !== 'deposit' && currentScreen !== 'withdraw') {
    return null;
  }

  return (
    <div data-testid='transaction-console'>
      <div className={styles['console']}>
        <Typography className={styles['console--dollar']}>$</Typography>
        <input
          data-testid='transaction-console-input'
          className={styles['console--input']}
          ref={inputRef}
          required
          type='number'
          placeholder='Enter amount'
          autoFocus
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
            if (e.key === 'Escape') {
              setFormError('');
              changeScreen('landing');
            }
          }}
        />
      </div>
      <Typography
        className={styles['console--error']}
        color='error'
        variant='subtitle'
      >
        {formError}
      </Typography>
      <div className={styles['console--buttons']}>
        <Button
          text='Confirm'
          onClick={onSubmit}
        />
        <Button
          text='Cancel'
          onClick={() => {
            setFormError('');
            changeScreen('landing');
          }}
        />
      </div>
    </div>
  );
};
