import { HelmetProvider } from "react-helmet-async";
import { RoutesProvider } from "./routes";

function App() {
  return (
    <HelmetProvider>
      <RoutesProvider/>
    </HelmetProvider>
  );
}

export default App;
