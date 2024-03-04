import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { MapContainer } from "./components/MapContainer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MapContainer />
    </BrowserRouter>
  );
}

export default App;
