import { useBanking } from '../../context';
import { Typography } from '../typography';
import { generateLandingSubtitle, generateLandingSubtitleRow2 } from './generate-subtitles';
import styles from './header.module.css';

export const Header: React.FC = () => {
  const { currentScreen, recentTransaction } = useBanking();
  const headerTitle = {
    landing: 'Welcome to AwesomeGIC Bank!',
    deposit: 'Deposit Money',
    withdraw: 'Withdraw Money',
    print: 'Print Statement',
    quit: 'Thank you for banking with AwesomeGIC Bank.',
  }[currentScreen];

  const headerSubtitle = {
    landing: generateLandingSubtitle(recentTransaction),
    deposit: 'Please enter the amount to deposit:',
    withdraw: 'Please enter the amount to withdraw:',
    print: '',
    quit: 'Have a nice day!',
  }[currentScreen];

  const headerSubtitle2 = {
    landing: generateLandingSubtitleRow2(recentTransaction),
    deposit: '',
    withdraw: '',
    print: '',
    quit: '',
  }[currentScreen];

  return (
    <div className={styles.header}>
      <div>
        <Typography
          variant='large'
          color='purple'
        >
          {headerTitle}
        </Typography>
        <Typography color='secondary'>{headerSubtitle}</Typography>
        {headerSubtitle2 && (
          <Typography
            color='secondary'
            className={styles['header--subtitle-2']}
          >
            {headerSubtitle2}
          </Typography>
        )}
      </div>
    </div>
  );
};
