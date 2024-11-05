import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './a/Header';
import ProductList from './a/productList';
import Cart from './a/Components/Cart';

function App() {
  // Manage the cart state at the App level
  const [cart, setCart] = useState<Cart>({ products: [], totalCost: 0 });

  // Load the cart from localStorage when the app loads
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Load the cart from localStorage
    }
  }, []);

  return (
    <div className="App">
      {/* Pass cart and setCart to Header and ProductList */}
      <Header cart={cart} setCart={setCart} />
      <ProductList cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;

