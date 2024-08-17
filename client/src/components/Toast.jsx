import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Toast = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
