// import { useState } from 'react';
// import './App.css'
// import './main.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WheelGame from './components/WheelGame';
import ShowPrize from './components/ShowPrize';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Route cho trang chủ (vòng quay) */}
        <Route path="/" element={<WheelGame />} />

        {/* Route cho trang sản phẩm */}
        <Route path="/products" element={<ShowPrize />} />
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
