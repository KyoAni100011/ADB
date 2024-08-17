import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const CheckoutPage = () => {
  const [country, setCountry] = React.useState("Turkmenistan");
  const [paymentMethod, setPaymentMethod] = React.useState("paypal");

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Billing address
          </Typography>

          <FormControl fullWidth margin="normal">
            <Typography variant="body1" gutterBottom>
              Country
            </Typography>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
              <MenuItem value="Vietnam">Vietnam</MenuItem>
              {/* Add more countries as needed */}
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PayPal"
              />
              <FormControlLabel
                value="creditCard"
                control={<Radio />}
                label="Credit/Debit Card"
              />
            </RadioGroup>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            Order details
          </Typography>

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
                  <Typography variant="body1">
                    Simple Strategy for Swing Trading the Stock Market
                  </Typography>
                  <Typography variant="body2">₫399,000</Typography>
                </Grid>
              </Grid>
              <Divider style={{ margin: "16px 0" }} />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Course Thumbnail"
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1">
                    Web Developer Bootcamp with Flask and Python in 2024
                  </Typography>
                  <Typography variant="body2">₫1,499,000</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box border={1} borderColor="grey.300" padding={2} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Typography variant="body2">Original Price: ₫1,898,000</Typography>
            <Divider style={{ margin: "16px 0" }} />
            <Typography variant="h6">Total: ₫1,898,000</Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
            >
              Complete Checkout
            </Button>
            <Typography variant="body2" style={{ marginTop: "16px" }}>
              By completing your purchase you agree to these{" "}
              <a href="#">Terms of Service</a>.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
