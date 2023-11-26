import './Styles/App.sass';
import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
import { useState } from 'react';

function App() {
  const [shoppingCart, setShoppingCart] = useState([])
  const [removeFromCart, setRemoveFromCart] = useState(0);
  const [navbarSearchValue, setNavbarSearchValue] = useState("")
  return (
    <div className="App">
      <Navbar passShoppingCart={shoppingCart} passRemoveFromCart={setRemoveFromCart} passSearchFieldValue={setNavbarSearchValue} />
      <Homepage passShoppingCart={setShoppingCart} passRemoveFromCart={removeFromCart} passSearchFieldValue={navbarSearchValue} />
    </div>
  );
}

export default App;
