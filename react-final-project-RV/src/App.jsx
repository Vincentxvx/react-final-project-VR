import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProductList from './components/ProductList'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import { AuthProvider } from './context/loginContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import { useEffect } from 'react'

function App() {
  const [productData, setProductData] = useState([]);

  const getProductData = async () => {
    try {
      const response = await fetch('http://localhost:3000/products', {

      });
      if (response.ok) {
        const data = await response.json();
        setProductData(data);
      } else {
        console.error('Hiba az adatok lekérésekor');
      }
    } catch (error) {
      console.error('Hiba:', error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const deleteProduct = (id) => {
    getProductData();
  }

  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList products={productData} deleteProduct={deleteProduct} />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App