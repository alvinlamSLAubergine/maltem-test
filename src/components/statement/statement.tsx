import { useBanking } from '../../context';
import { Button } from '../button';
import { StatementTable } from './statement-table';
import styles from './statement.module.css';

export const Statement: React.FC = () => {
  const { currentScreen, transactions, changeScreen } = useBanking();

  if (currentScreen !== 'print') {
    return null;
  }

  return (
    <div className={styles.statement}>
      <StatementTable transactions={transactions} />
      <div className={styles['statement--button']}>
        <Button
          text='Back'
          onClick={() => changeScreen('landing')}
        />
      </div>
    </div>
  );
};
