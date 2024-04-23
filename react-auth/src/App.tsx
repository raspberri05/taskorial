import { HelmetProvider } from "react-helmet-async";
import { RoutesProvider } from "./routes";
import { useState } from "react";
import { ThemeContext } from "./contexts/theme-context";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <HelmetProvider>
       <ThemeContext.Provider value={{ theme, setTheme }}>
          <RoutesProvider/>
      </ThemeContext.Provider>
    </HelmetProvider>
  );
}

export default App;
