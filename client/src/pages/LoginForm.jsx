import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link as MUILink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Toast from "../components/Toast";

const LoginForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const navigate = useNavigate();

  const { login } = useAuth();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you can add logic to submit the data to an API
    try {
      const response = await login(formData);
      if (response.success) {
        setMessage(response.message);
        setSeverity(severity);
        setOpen(true);
        setTimeout(() => navigate("/"), 5000);
      } else {
        setMessage(response.message);
        setSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Toast
        open={open}
        onClose={handleClose}
        message={message}
        severity={severity}
      />
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
        <Typography variant="h2" component="h2" gutterBottom textAlign="center">
          Let's start
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <TextField
            label="Email"
            name="Email"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            required
            value={formData.Email}
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
            value={formData.Password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Login
          </Button>
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
          >
            Don't have an account?
          </Typography>
          <MUILink
            component={Link}
            to="/signup"
            variant="button"
            color="primary"
            textAlign="center"
            border="1px solid"
            borderRadius={1}
            py={0.5}
            sx={{ mt: 2, textDecoration: "none" }}
          >
            Sign Up
          </MUILink>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
