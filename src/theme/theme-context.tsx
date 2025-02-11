import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import './theme-context.css';

interface ThemeState {
  theme: 'light' | 'dark';
}

interface ThemeContext extends ThemeState {
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = localStorage.getItem('theme') as 'light' | 'dark';
  const [state, dispatch] = useReducer(themeReducer, { theme: theme || 'light' });

  const themeName = state.theme === 'light' ? 'light' : 'dark';
  return (
    <ThemeContext.Provider
      value={{
        ...state,
        toggleTheme: () => dispatch(),
      }}
    >
      <div className={`theme theme--${themeName}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

function themeReducer(state: ThemeState): ThemeState {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  return { theme: newTheme };
}
