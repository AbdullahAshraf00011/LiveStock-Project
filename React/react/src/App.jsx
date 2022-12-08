import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage'
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import ProfileScreen from "./pages/Profile";
import AdScreen from './pages/Ads';
import ProductAdding from "./pages/ProductAdding";
import ProductPage from './pages/ProductPage.jsx';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <div className="main">
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/page/:pageNumber' element={<HomePage/>}/>
          <Route path='/Login' element={<LoginScreen/>}/>
          <Route path='/Register' element={<RegisterScreen/>}/>
          <Route path='/Profile' element={<ProfileScreen/>}/>
          <Route path='/ads' element={<AdScreen/>}/>
          <Route path='/Ad/new' element={<ProductAdding/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/search/:keyword' element={<HomePage/>}/>
          <Route path='/search/:keyword/page/:pageNumber' element={<HomePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
