import './App.css';
import { Header } from './components';
import { ThemeProvider } from './theme';

function App() {
  return (
    <ThemeProvider>
      <div className='app'>
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;
