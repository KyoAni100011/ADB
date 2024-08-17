import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Link as MUILink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { registerStudent } from "../apis/user.api";

const SignUpForm = () => {
  const [formValues, setFormValues] = useState({
    UserName: "",
    Password: "",
    PhoneNumber: "",
    Email: "",
    Street: "",
    Ward: "",
    District: "",
    City: "",
    DateOfBirth: "",
    Gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormValues((prevValues) => ({
      ...prevValues,
      DateOfBirth: new Date(formValues.DateOfBirth),
    }));
    const response = await registerStudent(formValues);
    console.log(response);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90vw",
        maxWidth: "500px",
        p: 3,
      }}
    >
      <Typography variant="h4" component="h4" gutterBottom textAlign="center">
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          width: "100%",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <TextField
          label="User Name"
          name="UserName"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="PhoneNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <Grid container spacing={2} margin="normal">
          <Grid item xs={6}>
            <TextField
              label="Street"
              name="Street"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ward"
              name="Ward"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="District"
              name="District"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              name="City"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <TextField
          label="Date of Birth"
          name="DateOfBirth"
          variant="outlined"
          type="date"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Gender</InputLabel>
          <Select
            name="Gender"
            value={formValues.Gender}
            onChange={handleChange}
            label="Gender"
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Sign Up
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
        >
          Already have an account?
        </Typography>
        <MUILink
          component={Link}
          to="/login"
          variant="button"
          color="primary"
          textAlign="center"
          border="1px solid"
          borderRadius={1}
          py={0.5}
          sx={{ mt: 2, textDecoration: "none" }}
        >
          Login
        </MUILink>
      </Box>
    </Box>
  );
};

export default SignUpForm;
