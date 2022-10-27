import React from 'react'
import Home from './pages/Home'
import AllProductPage from './pages/AllProductPage'
import SingleProductPage from './pages/SingleProductPage'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Success from './pages/Success'
import { useSelector } from 'react-redux'
import AdminDashboard from './pages/adminDashboard/AdminDashboard'
import Sidebar from './components/sidebar/Sidebar'
import Topbar from './components/topbar/Topbar'
import NewProduct from "./pages/newProduct/NewProduct"
import NewUser from "./pages/newUser/NewUser"
import Product from "./pages/product/Product"
import ProductList from "./pages/productList/ProductList"
import User from "./pages/user/User"
import UserList from "./pages/userList/UserList"
import AdminLogin from './pages/login/Login'

const App = () => {
  const user = useSelector(state => state.user.currentUser)
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.isAdmin
  return (
    <BrowserRouter>

      {/* <div> */}
      {/* {admin && <Topbar />} */}
      {/* 
        <div className="container"> */}
      {/* {admin && <Sidebar />} */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to="/" replace /> : <Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
        <Route path='/products/:category' element={<AllProductPage />} />
        <Route path='/product/:id' element={<SingleProductPage />} />

        <Route path="/admin" element={admin && <AdminDashboard />} />
        <Route path="/users" element={admin && <UserList />} />
        <Route path="/user/:userId" element={admin && <User />} />
        <Route path="/newuser" element={admin && <NewUser />} />
        <Route path="/products" element={admin && <ProductList />} />
        <Route path="/products/:productId" element={admin && <Product />} />
        <Route path="/newproduct" element={admin && <NewProduct />} />
        <Route path="/adminlogin" element={admin ? <Navigate to="/admin" /> : <AdminLogin />} />
      </Routes>

      {/* </div>
      </div> */}
    </BrowserRouter>
  )
}

export default App
