import { HelmetProvider } from 'react-helmet-async';
import { RoutesProvider } from './routes';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <RoutesProvider />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;