import { Box, AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBar from "./SearchBar";
import "../Styles/Navbar.sass";

function Navbar(){
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
            >
              <Badge badgeContent={1} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box></>)
}
export default Navbar;
