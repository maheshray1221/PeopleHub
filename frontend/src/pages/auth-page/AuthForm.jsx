import "../auth-page/AuthForm.css";
import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState(0);

  const HandleSubmit = (e) => {
    e.preventDefault();
    setError({
      username: !username.trim(),
      email: !email.trim(),
      password: !password.trim(),
    });
  };
  return (
    <div class="container">
      <Box
        sx={{
          minWidth: 400,
          maxWidth: 800,
          mx: "auto",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor:"white"
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          maxHeight="100vh"
        >
          {formState === 0 ? (
            <>
              <Button
                sx={{ mr: 4 }}
                onClick={() => setFormState(0)}
                variant="contained"
              >
                Register
              </Button>
              <Button onClick={() => setFormState(1)} variant="outlined">
                LogIn
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ mr: 4 }}
                onClick={() => setFormState(0)}
                variant="outlined"
              >
                Register
              </Button>
              <Button onClick={() => setFormState(1)} variant="contained">
                LogIn
              </Button>
            </>
          )}
        </Grid>

        {formState === 0 ? (
          <Typography variant="body1" color="gray" align="center" mt={2}>
            Create Account
          </Typography>
        ) : (
          <Typography variant="body1" color="gray" align="center" mt={2}>
            Welcome Back
          </Typography>
        )}
        <form onSubmit={HandleSubmit}>
          <Grid>
            {formState === 0 && (
              <Grid>
                <TextField
                  id="outlined-error"
                  fullWidth
                  label="Username"
                  name="Username"
                  margin="normal"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError({ ...error, username: false });
                  }}
                  error={error.username}
                  helperText={error.username ? "Username is required*" : ""}
                />
              </Grid>
            )}
            <Grid>
              <TextField
                fullWidth
                label="Email"
                name="Email"
                margin="normal"
                value={email}
               onChange={(e) => {
                    setEmail(e.target.value);
                    setError({ ...error, email: false });
                  }}
                  error={error.email}
                  helperText={error.email ? "Email is required*" : ""}
              />
            </Grid>
            <Grid>
              <TextField
                placeholder="Password"
                fullWidth
                label="Password"
                name="Password"
                margin="normal"
                value={password}
               onChange={(e) => {
                    setPassword(e.target.value);
                    setError({ ...error, password: false });
                  }}
                  error={error.password}
                  helperText={error.password ? "Password is required*" : ""}
              />
            </Grid>
            <Grid>
              <Button type="submit" fullWidth variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
