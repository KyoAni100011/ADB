import React from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderConfirmation = () => {
  return (
    <Grid container spacing={4} padding={4}>
      {/* Left Section */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <CheckCircleIcon style={{ fontSize: 40, color: "green" }} />
          </Grid>
          <Grid item>
            <Typography variant="h6">Thank you for your purchase!</Typography>
            <Typography>Your order # is: 000000005.</Typography>
            <Typography>
              We'll email you an order confirmation with details and tracking
              info.
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
          Continue Shopping
        </Button>
        <Typography variant="h6" style={{ marginTop: 32 }}>
          Create account for next time
        </Typography>
        <Typography>
          You can track your order status by creating an account.
        </Typography>
        <Typography>Email Address: test@tm.com</Typography>
        <Button variant="contained" color="secondary" style={{ marginTop: 16 }}>
          Create an Account
        </Button>
      </Grid>

      {/* Right Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Order Information</Typography>
            <Divider style={{ margin: "16px 0" }} />
            <Typography>Order Date: October 5, 2017</Typography>
            <Grid container spacing={2} style={{ marginTop: 16 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Shipping Address</Typography>
                <Typography>test tm</Typography>
                <Typography>addr 1</Typography>
                <Typography>Paris, Paris, 10005</Typography>
                <Typography>France</Typography>
                <Typography>T: 111-22-33</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Billing Address</Typography>
                <Typography>test tm</Typography>
                <Typography>addr 1</Typography>
                <Typography>Paris, Paris, 10005</Typography>
                <Typography>France</Typography>
                <Typography>T: 111-22-33</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Shipping Method</Typography>
                <Typography>Flat Rate - Fixed</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Payment Method</Typography>
                <Typography>Check / Money order</Typography>
              </Grid>
            </Grid>
            <Divider style={{ margin: "16px 0" }} />
            <Typography variant="h6">Product</Typography>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography>Bolo Sport Watch</Typography>
              </Grid>
              <Grid item>
                <Typography>\$49.00</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography>Shipping & Handling</Typography>
              </Grid>
              <Grid item>
                <Typography>\$5.00</Typography>
              </Grid>
            </Grid>
            <Divider style={{ margin: "16px 0" }} />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">Grand Total</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">\$54.00</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OrderConfirmation;
