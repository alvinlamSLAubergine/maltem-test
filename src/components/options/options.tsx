import { useBanking } from '../../context';
import { OptionsButton } from './options-button';
import styles from './options.module.css';

export const Options: React.FC = () => {
  const { currentScreen, changeScreen } = useBanking();

  if (currentScreen !== 'landing') {
    return null;
  }

  return (
    <div className={styles.options}>
      <OptionsButton
        option='withdraw'
        onClick={() => changeScreen('withdraw')}
      />
      <OptionsButton
        option='deposit'
        onClick={() => changeScreen('deposit')}
      />
      <OptionsButton
        option='print'
        onClick={() => changeScreen('print')}
      />
      <OptionsButton
        option='quit'
        onClick={() => changeScreen('quit')}
      />
    </div>
  );
};
