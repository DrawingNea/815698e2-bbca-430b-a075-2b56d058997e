import { Box, AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBar from "./SearchBar";
import "../Styles/Navbar.sass";
import CartDrawer from "./CartDrawer";
import { useEffect, useState } from "react";
import { IEvent } from "../Interfaces/IEvent";

function Navbar({passShoppingCart,}:{passShoppingCart: any;}){
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
    return (<>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar className="navbar" component="nav" elevation={0}>
          <Toolbar>
            <SearchBar/>
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
              <Badge badgeContent={1} color="error">
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
      />
      </>)
}
export default Navbar;
