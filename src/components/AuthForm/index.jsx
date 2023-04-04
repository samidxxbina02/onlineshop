import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState(false);
  const { registerRequest, loginRequest } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
      userImportantList: [],
      likedList: [],
    };

    if (hasAccount) {
      loginRequest(userData, () => {
        navigate("/");
        setEmail("");
        setPassword("");
      });
    } else {
      registerRequest(userData, () => {
        navigate("/");
        setEmail("");
        setPassword("");
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {hasAccount ? "Login" : "Register"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {hasAccount ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => console.log(123)}
            >
              Log In
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ mt: 3, mb: 2, ml: 18 }}
              onClick={() => console.log(123)}
            >
              Register
            </Button>
          )}

          <Grid container>
            <Grid item>
              {hasAccount ? (
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setHasAccount(false)}
                >
                  {"Don't have an account? Register Now"}
                </Link>
              ) : (
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setHasAccount(true)}
                >
                  {"Already have an account? Log In"}
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
