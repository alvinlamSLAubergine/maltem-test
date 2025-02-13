import { Transaction } from '../../types';
import { Typography } from '../typography';
import styles from './statement-table.module.css';

interface Props {
  transactions: Transaction[];
}

export const StatementTable: React.FC<Props> = ({ transactions }) => {
  const HeaderCell = ({ title, width }: { title: string; width?: number }) => (
    <th
      className={styles['table--header-cell']}
      style={{ width: `${width}px` }}
    >
      <Typography variant='bold'>{title}</Typography>
    </th>
  );

  const Header = () => (
    <thead>
      <tr>
        <HeaderCell
          title='Date'
          width={220}
        />
        <HeaderCell
          title='Amount'
          width={100}
        />
        <HeaderCell
          title='Balance'
          width={100}
        />
      </tr>
    </thead>
  );

  const RowCell = ({ value }: { value: string }) => (
    <td className={styles['table--cell']}>
      <Typography>{value}</Typography>
    </td>
  );

  const Row = ({ date, amount, balance }: Transaction) => (
    <tr>
      <RowCell value={date} />
      <RowCell value={amount.toFixed(2)} />
      <RowCell value={balance.toFixed(2)} />
    </tr>
  );

  const NoTransactions = () => (
    <tr>
      <td
        colSpan={3}
        className={styles['table--no-transactions']}
      >
        <Typography>No transactions</Typography>
      </td>
    </tr>
  );

  return (
    <table className={styles.table}>
      <Header />
      <tbody
        style={{
          filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1))',
        }}
      >
        {transactions.length === 0 && <NoTransactions />}
        {transactions.map((transaction) => (
          <Row
            key={transaction.id}
            {...transaction}
          />
        ))}
      </tbody>
    </table>
  );
};
