import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../Styles/Navbar.sass";
import "../Styles/SearchBar.sass";

function SearchBar({ setSearchFieldValue }: { setSearchFieldValue: Function }) {
  return (
    <>
      <Paper className="navSearchBar" component="form">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search events" }}
          onChange={(e) => setSearchFieldValue(e.target.value)}
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}
export default SearchBar;
