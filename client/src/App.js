import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoutes from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
function App() {
  return (
   <>
   <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/categories' element={<Categories />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/category/:slug' element={<CategoryProduct />} />
      <Route path='/contact' element={<Contact />}/>
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path='/search' element={<Search />} /> 
      <Route path='/policy' element={<Policy />}/>
      <Route path='/dashboard' element={<AdminRoute />}> 
        <Route path='admin' element={<AdminDashboard/>} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/users" element={<Users />} />
         <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/products" element={<Products />} />
        
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='*' element={<Pagenotfound />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/dashboard' element={<PrivateRoute />}>
      <Route path="user" element={<Dashboard />} />
      <Route path="user/orders" element={<Orders />} />
      <Route path="user/profile" element={<Profile />} />
      </Route>
      

   </Routes>
   </>
  );
}

export default App;
