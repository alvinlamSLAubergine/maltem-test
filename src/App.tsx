import './App.css';
import { Header, Options } from './components';
import { BankingProvider } from './context';
import { ThemeProvider } from './theme';

function App() {
  return (
    <ThemeProvider>
      <BankingProvider>
        <div className='app'>
          <Header />
          <Options />
        </div>
      </BankingProvider>
    </ThemeProvider>
  );
}

export default App;
