import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

// CartItem component
const CartItem = ({ image, title, author, price }) => (
  <ListItem
    alignItems="flex-start"
    sx={{
      borderBottom: "1px solid #e0e0e0",
      padding: "16px 0",
      ":last-child": { borderBottom: "none" },
    }}
  >
    <ListItemAvatar>
      <Avatar
        alt={title}
        src={image}
        variant="square"
        sx={{
          width: 60,
          height: 60,
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginRight: 2,
        }}
      />
    </ListItemAvatar>
    <ListItemText
      primary={
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            fontSize: "0.875rem",
          }}
        >
          {title}
        </Typography>
      }
      secondary={
        <>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
            {author}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            {price}
          </Typography>
        </>
      }
    />
  </ListItem>
);

// Cart component
const Cart = ({ items, total }) => (
  <Box sx={{ width: 360, bgcolor: "background.paper", p: 2 }}>
    <List>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <CartItem {...item} />
          {index < items.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
    <Divider />
    <Stack
      sx={{
        mt: 2,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Typography variant="h6">Total: {total}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 1, fontSize: "0.875rem" }}
      >
        <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
          Go to Cart
        </Link>
      </Button>
    </Stack>
  </Box>
);

// Navbar component
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const { user } = useAuth();
  const [isAuth, setAuth] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isCartOpen = Boolean(cartAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget);
  const handleCartMenuOpen = (event) => setCartAnchorEl(event.currentTarget);
  const handleCartMenuClose = () => setCartAnchorEl(null);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const cartItems = [
    {
      image: "path/to/image1.jpg",
      title: "Simple Strategy for Swing Trading the Stock Market",
      author: "Tom Watson",
      price: "₫399,000",
    },
    {
      image: "path/to/image2.jpg",
      title: "Web Developer Bootcamp with Flask and Python",
      author: "Jose Salvatierra, Teclado by Jose",
      price: "₫1,499,000",
    },
  ];

  const cartTotal = "₫1,898,000";

  useEffect(() => {
    setAuth(user !== null);
    console.log(isAuth);
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Logo
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {isAuth ? (
            <React.Fragment>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{ mr: 1, color: "white", borderColor: "white" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{ color: "white", backgroundColor: "primary.main" }}
              >
                Sign Up
              </Button>
            </React.Fragment>
          ) : (
            ""
          )}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show cart items"
              color="inherit"
              onClick={handleCartMenuOpen}
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isAuth ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              ""
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            color: "red",
          }}
        >
          Log out
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show cart items"
            color="inherit"
            onClick={handleCartMenuOpen}
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={cartAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isCartOpen}
        onClose={handleCartMenuClose}
      >
        <Cart items={cartItems} total={cartTotal} />
      </Menu>
    </Box>
  );
};

export default Navbar;
