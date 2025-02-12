import { ReactComponent as WithdrawIcon } from '../../assets/cash-icon.svg';
import { ReactComponent as DepositIcon } from '../../assets/credit-icon.svg';
import { ReactComponent as PrintIcon } from '../../assets/document-icon.svg';
import { ReactComponent as QuitIcon } from '../../assets/quit-icon.svg';
import { Typography } from '../typography';
import styles from './options.module.css';

interface Props {
  option: 'withdraw' | 'deposit' | 'print' | 'quit';
  onClick?: () => void;
}

export const OptionsButton: React.FC<Props> = ({ option, onClick = () => {} }) => {
  const Icon = {
    ['withdraw']: WithdrawIcon,
    ['deposit']: DepositIcon,
    ['print']: PrintIcon,
    ['quit']: QuitIcon,
  }[option];

  const title = {
    ['withdraw']: 'Withdraw',
    ['deposit']: 'Deposit',
    ['print']: 'Print Statement',
    ['quit']: 'Quit',
  }[option];

  return (
    <button
      data-testid={`${option}-options-button`}
      className={styles['options--button']}
      onClick={onClick}
    >
      <Typography
        variant='bold'
        color='subtitle'
        className={styles['options--button-title']}
      >
        {title}
      </Typography>
      <Icon className={styles['options--button-icon']} />
    </button>
  );
};
