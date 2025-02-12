import { OptionsButton } from './options-button';
import styles from './options.module.css';

export const Options: React.FC = () => {
  return (
    <div className={styles.options}>
      <OptionsButton option='withdraw' />
      <OptionsButton option='deposit' />
      <OptionsButton option='print' />
      <OptionsButton option='quit' />
    </div>
  );
};
