import './Styles/App.sass';
import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
import { useState } from 'react';

function App() {
  const [shoppingCart, setShoppingCart] = useState([])
  return (
    <div className="App">
      <Navbar passShoppingCart={shoppingCart} />
      <Homepage passShoppingCart={setShoppingCart}  />
    </div>
  );
}

export default App;
