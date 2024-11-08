import Header from "./components/header/header.jsx";
import "./App.css";
import HomePage from "./pages/client_page/homePage.jsx";
import AdminPage from "./pages/admin_page/adminPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route
          path="/*"
          element={<div className="w-full h-screen bg-c1 text-c4">404</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
