import './App.css';
import { Header, Options, Statement, TransactionConsole } from './components';
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
          <Statement />
        </div>
      </BankingProvider>
    </ThemeProvider>
  );
}

export default App;
