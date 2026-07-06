import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import CompanyRegister from "./pages/CompanyRegister/CompanyRegister";
import Login from "./pages/Login/Login";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import AddProduct from "./pages/AddProduct/AddProduct";
import MyProducts from "./pages/MyProducts/MyProducts";
import EditProduct from "./pages/EditProduct/EditProduct";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import Settings from "./pages/Settings/Settings";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import DeleteAccount from "./pages/DeleteAccount/DeleteAccount";
import NotFound from "./pages/NotFound/NotFound";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Companies from "./pages/Companies/Companies";
import CompanyPublicProfile from "./pages/CompanyPublicProfile/CompanyPublicProfile";
import MyInquiries from "./pages/MyInquiries/MyInquiries";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Search from "./pages/Search/Search";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/company-register" element={<CompanyRegister />} />

        <Route
          path="/company-dashboard"
          element={<CompanyDashboard />}
        />

        <Route
          path="/add-product"
          element={<AddProduct/>}
        />

        <Route
          path="/my-products"
          element={<MyProducts/>}
        />

        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/company-profile"
          element={<CompanyProfile />}
        />

        <Route
          path="/settings"
          element={<Settings/>}
        />

        <Route
          path="/change-password"
          element={<ChangePassword/>}
        />

        <Route
          path="/delete-account"
          element={<DeleteAccount />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

        <Route path="/products" element={<Products />} />

        <Route
          path="/product/:id"
          element={<ProductDetails/>}
        />

        <Route path="/companies" element={<Companies />} />

        <Route
          path="/company/:id"
          element={<CompanyPublicProfile />}
        />

        <Route
          path="/my-inquiries"
          element={<MyInquiries/>}
        />

        <Route

          path="/forgot-password"

          element={<ForgotPassword/>}

        />

        <Route

          path="/reset-password"

          element={<ResetPassword/>}

        />

        <Route path="/search" element={<Search />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;