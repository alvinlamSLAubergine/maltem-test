import styles from './button.module.css';

interface Props {
  onClick: () => void;
  text: string;
}

export const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button
      className={styles['button']}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
