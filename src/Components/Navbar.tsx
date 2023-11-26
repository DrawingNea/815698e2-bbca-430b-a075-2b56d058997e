import { Box, AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBar from "./SearchBar";
import "../Styles/Navbar.sass";
import CartDrawer from "./CartDrawer";
import { useEffect, useState } from "react";
import { IEvent } from "../Interfaces/IEvent";

function Navbar({
  passShoppingCart,
  passRemoveFromCart,
  passSearchFieldValue,
}: {
  passShoppingCart: any;
  passRemoveFromCart: Function;
  passSearchFieldValue: Function;
}) {
  //open and close shopping cart drawer
  const [cartOpen, setCartOpen] = useState(false);
  function toggleShoppingCart() {
    setCartOpen(!cartOpen);
  }

  //Recieve and set shopping cart
  const [shoppingCart, setShoppingCart] = useState<IEvent[]>([]);
  useEffect(() => {
    setShoppingCart(passShoppingCart);
  }, [passShoppingCart]);

  //Pass id of event to remove
  const [removeFromCart, setRemoveFromCart] = useState(0);
  function removeEventFromCart(id: number) {
    setRemoveFromCart(id);
  }
  useEffect(() => {
    passRemoveFromCart(removeFromCart);
  }, [removeFromCart]);

  //Passing the value of search field input to parent component
  const [searchFieldValue, setSearchFieldValue] = useState("");
  useEffect(() => {
    passSearchFieldValue(searchFieldValue);
  }, [searchFieldValue]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="navbar" component="nav" elevation={0}>
          <Toolbar>
            <SearchBar setSearchFieldValue={setSearchFieldValue} />
            <IconButton className="navIcons" type="button" aria-label="search">
              <FilterAltIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              className="navIcons"
              type="button"
              aria-label="search"
              onClick={toggleShoppingCart}
            >
              <Badge badgeContent={shoppingCart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        shoppingCart={shoppingCart}
        removeEventFromCart={removeEventFromCart}
      />
    </>
  );
}
export default Navbar;
