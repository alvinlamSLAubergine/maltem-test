import { ReactComponent as DarkIcon } from '../../assets/dark-icon.svg';
import { ReactComponent as LightIcon } from '../../assets/light-icon.svg';
import styles from './icon-button.module.css';

interface Props {
  icon: 'light' | 'dark';
  tooltip?: string;
  onClick: () => void;
}

export const IconButton: React.FC<Props> = ({ icon, onClick }) => {
  const Icon = {
    ['light']: LightIcon,
    ['dark']: DarkIcon,
  }[icon];

  return (
    <button
      data-testid='icon-button'
      className={styles['icon-button']}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};
