import './Styles/App.sass';
import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
import { useState } from 'react';

function App() {
  const [shoppingCart, setShoppingCart] = useState([])
  const [removeFromCart, setRemoveFromCart] = useState(0);
  return (
    <div className="App">
      <Navbar passShoppingCart={shoppingCart} passRemoveFromCart={setRemoveFromCart} />
      <Homepage passShoppingCart={setShoppingCart} passRemoveFromCart={removeFromCart} />
    </div>
  );
}

export default App;
