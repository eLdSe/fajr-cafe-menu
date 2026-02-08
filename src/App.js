import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import WaiterPage from "./pages/WaiterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/waiter" element={<WaiterPage />} />
      </Routes>
    </Router>
  );
}

export default App;