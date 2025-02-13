import './App.css';
import { Header, Options, TransactionConsole } from './components';
import { BankingProvider } from './context';
import { ThemeProvider } from './theme';

function App() {
  return (
    <ThemeProvider>
      <BankingProvider>
        <div className='app'>
          <Header />
          <Options />
          <TransactionConsole />
        </div>
      </BankingProvider>
    </ThemeProvider>
  );
}

export default App;
