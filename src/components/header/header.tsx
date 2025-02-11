import { Typography } from '../typography';

export const Header: React.FC = () => {
  return (
    <div className='header'>
      <div className='header--title'>
        <Typography
          variant='large'
          color='purple'
        >
          Welcome to AwesomeGIC Bank!
        </Typography>
        <Typography color='secondary'>What would you like to do to?</Typography>
      </div>
    </div>
  );
};
