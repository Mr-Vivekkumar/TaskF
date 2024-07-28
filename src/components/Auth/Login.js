"use client"
import React, { useState } from 'react';
import { Typography, Button, Card, Grid, TextField, Link, Box, Snackbar, Alert } from '@mui/material';
import '../../font.css';
import axios from "axios"
const Login = (props) => {
  const [logindetails, setLoginDetails] = useState({ email: '', password: '' })
  const [alert, setAlert] = useState("")
  const LoginUser = () => {
    if (!logindetails?.email) {
      setAlert("Please Provide Email!")
      return
    }
    if (!logindetails?.password) {
      setAlert("Please Provide Password!")
      return
    }
    const loginUserQuery = {
      query: `
        query($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            message
            success
            token
          }
        }
      `,
      variables: {
        email: logindetails?.email,
        password: logindetails?.password
      }
    };

    axios.post(
      // 'http://localhost:4000/graphql',
      'https://taskb.onrender.com/graphql',
      loginUserQuery,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        if (response?.data?.data?.loginUser?.success) {
          localStorage.setItem("token", response?.data?.data?.loginUser?.token)
          window.location.reload();
        }
        else {
          setAlert(response?.data?.data?.loginUser?.message)
        }
      })
      .catch(error => {
        console.log(error, "response")
      });
  }
  return (
    <Box
      sx={{
        height: '100vh',
        background: '#09111B',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          padding: 6,
          width: '100%',
          maxWidth: 400,
          background: 'rgba(0, 69, 133, 0.12)',
          borderRadius: 2,
          maxHeight: 500
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography
              variant="h4"
              noWrap
              className='qwert'
              component="div"
              sx={{
                color: 'white',
                display: 'flex',
                width: '100%',
              }}
            >
              <span>future</span>
              <span style={{ color: '#4DABF7' }}>konnect</span>
            </Typography>
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              fullWidth
              sx={{
                background: 'rgba(90, 113, 145, 0.35)',
                borderRadius: 1,
                '& .MuiInputBase-root': {
                  height: 40, // Adjust the height here
                },
              }}
              InputLabelProps={{ style: { color: '#FFFFFF' } }}
              InputProps={{ style: { color: '#FFFFFF' } }}
              onChange={(e) => setLoginDetails({ ...logindetails, email: e.target.value })}
            />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              sx={{
                background: 'rgba(90, 113, 145, 0.35)',
                borderRadius: 1,
                '& .MuiInputBase-root': {
                  height: 40, // Adjust the height here
                },
              }}
              InputLabelProps={{ style: { color: '#FFFFFF' } }}
              InputProps={{ style: { color: '#FFFFFF' } }}
              onChange={(e) => setLoginDetails({ ...logindetails, password: e.target.value })}
            />
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                background: 'linear-gradient(90deg, rgba(90, 147, 193, 0.64) 0%, rgba(35, 93, 140, 0.64) 94%)',
                borderRadius: 1,
              }}
              onClick={() => LoginUser()}
            >
              LOGIN
            </Button>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" sx={{ color: 'white', marginRight: '16px' }} underline="always" onClick={() => props.setAuthState("register")}>
              Register
            </Link>
            <Link href="#" variant="body2" sx={{ color: 'white' }} underline="always" onClick={() => props.setAuthState("forgetpassword")}>
              Forgot Password?
            </Link>
          </Grid>
        </Grid>
      </Card>
      <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert("")}>
        <Alert onClose={() => setAlert("")} severity="info" sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
