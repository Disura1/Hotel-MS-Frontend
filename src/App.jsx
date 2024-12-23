import "./App.css";
import AdminPage from "./pages/admin_page/adminPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestComponent from "./components/test/test.jsx";
import LoginPage from "./pages/login/login.jsx";
import CategoriesPage from "./pages/client_page/categories.jsx";
import { Toaster } from "react-hot-toast";
import { UploadComponent } from "./components/test/test3.jsx";
import { CustomerPage } from "./pages/client_page/clientPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/test" element={<UploadComponent />} />
        <Route path="/*" element={<CustomerPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;