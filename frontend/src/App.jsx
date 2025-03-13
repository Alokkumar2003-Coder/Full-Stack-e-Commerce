import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Routes/Home";
import Profile from "./pages/Shopping/Profile";
import Admin from "./components/Admin-Views/Admin";
import Men from "./components/Routes/Men";
import Women from "./components/Routes/Women";
import Kids from "./components/Routes/Kids";
import Search from "./pages/Shopping/Search";
import Footwear from "./components/Routes/Footwear";
import Accessories from "./components/Routes/Accessories";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Layout from './pages/View/Layout';
import Cart from './pages/Shopping/Cart';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes that use the Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="search" element={<Search />} />
          <Route path="footwear" element={<Footwear />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* Routes outside the Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
