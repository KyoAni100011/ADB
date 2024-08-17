import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ShoppingCart = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Shopping Cart
      </Typography>

      <Typography variant="h6" gutterBottom>
        2 Courses in Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Course Thumbnail"
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">
                    Simple Strategy for Swing Trading the Stock Market
                  </Typography>
                  <Typography variant="body2">By Tom Watson</Typography>
                  <Typography variant="body2">4.3 ★ (1,182 ratings)</Typography>
                  <Typography variant="body2">
                    1.5 total hours • 8 lectures • All Levels
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button size="small">Remove</Button>
                      <Button size="small">Save for Later</Button>
                      <Button size="small">Move to Wishlist</Button>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">₫399,000</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Course Thumbnail"
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">
                    Web Developer Bootcamp with Flask and Python in 2024
                  </Typography>
                  <Typography variant="body2">
                    By Jose Salvatierra and 1 other
                  </Typography>
                  <Typography variant="body2">4.6 ★ (6,856 ratings)</Typography>
                  <Typography variant="body2">
                    19.5 total hours • 183 lectures • Intermediate
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Button size="small">Remove</Button>
                      <Button size="small">Save for Later</Button>
                      <Button size="small">Move to Wishlist</Button>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">₫1,499,000</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box border={1} borderColor="grey.300" padding={2} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Total: ₫1,898,000
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Checkout
            </Button>
            <Divider style={{ margin: "16px 0" }} />
            <Typography variant="h6" gutterBottom>
              Promotions
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2">KEEP LEARNING is applied</Typography>
              <IconButton size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField
              label="Enter Coupon"
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" fullWidth>
              Apply
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShoppingCart;
