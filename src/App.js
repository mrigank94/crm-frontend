import Auth from "./pages/Auth";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Route, Routes } from "react-router-dom";
import Engineer from "./pages/Engineer";
import Customer from "./pages/Customer";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/engineer" element={<Engineer />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
