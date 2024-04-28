import { HelmetProvider } from "react-helmet-async";
import { RoutesProvider } from "./routes";

/**
 * Main component of the application
 * This acts as the entry point of the app & it wraps the routes with HelmetProvider 
 * to enable setting document head elements ie title, meta tags
 * @returns JSX element containing main component of the app
 */
function App() {
  return (
    <HelmetProvider>
      <RoutesProvider/>
    </HelmetProvider>
  );
}

export default App;
