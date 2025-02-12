import './App.css';
import { Header, Options } from './components';
import { ThemeProvider } from './theme';

function App() {
  return (
    <ThemeProvider>
      <div className='app'>
        <Header />
        <Options />
      </div>
    </ThemeProvider>
  );
}

export default App;
