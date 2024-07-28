"use client"
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, Link, Grid, Snackbar, Alert } from '@mui/material';
import '../../font.css';
import axios from "axios"
const SignUp = (props) => {
  const [registerdetails, setRegisterDetails] = useState({ email: '', password: '', username: '' })
  const [alert, setAlert] = useState("")
  const RegisterUser = () => {
    if (!registerdetails?.email) {
      setAlert("Please Provide Email!")
      return
    }
    if (!registerdetails?.password) {
      setAlert("Please Provide Password!")
      return
    }
    if (!registerdetails?.username) {
      setAlert("Please Provide Username!")
      return
    }
    const registerUserQuery = {
      query: `
      mutation($username: String!, $password: String!, $email: String!){
        registerUser(username: $username, password: $password, email: $email) {
          message
          success
        }
      }
      `,
      variables: {
        email: registerdetails?.email,
        password: registerdetails?.password,
        username: registerdetails?.username
      }
    };

    axios.post(
      // 'http://localhost:4000/graphql',
      'https://taskb.onrender.com/graphql',
      registerUserQuery,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        if (response?.data?.data?.registerUser?.success) {
          setAlert(response?.data?.data?.registerUser?.message)
          setTimeout(() => {
            props.setAuthState("login")
          }, 3000)
        }
        else {
          setAlert(response?.data?.data?.registerUser?.message)
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
          maxHeight: 600, // Increase height for a rectangular appearance
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          noWrap
          className='qwert'
          component="div"
          sx={{
            color: 'white',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <span>future</span>
          <span style={{ color: '#4DABF7' }}>konnect</span>
        </Typography>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            variant="outlined"
            label="User Name"
            type="text"
            fullWidth
            sx={{
              background: 'rgba(90, 113, 145, 0.35)',
              borderRadius: 1,
              mb: 2, // Margin bottom for spacing
              '& .MuiInputBase-root': {
                height: 40, // Consistent height
              },
            }}
            InputLabelProps={{ style: { color: '#FFFFFF' } }}
            InputProps={{ style: { color: '#FFFFFF' } }}
            onChange={(e) => setRegisterDetails({ ...registerdetails, username: e.target.value })}
          />
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
              mb: 2, // Margin bottom for spacing
              '& .MuiInputBase-root': {
                height: 40, // Consistent height
              },
            }}
            InputLabelProps={{ style: { color: '#FFFFFF' } }}
            InputProps={{ style: { color: '#FFFFFF' } }}
            onChange={(e) => setRegisterDetails({ ...registerdetails, email: e.target.value })}
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
              mb: 2, // Margin bottom for spacing
              '& .MuiInputBase-root': {
                height: 40, // Consistent height
              },
            }}
            InputLabelProps={{ style: { color: '#FFFFFF' } }}
            InputProps={{ style: { color: '#FFFFFF' } }}
            onChange={(e) => setRegisterDetails({ ...registerdetails, password: e.target.value })}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              background: 'linear-gradient(90deg, rgba(90, 147, 193, 0.64) 0%, rgba(35, 93, 140, 0.64) 94%)',
              borderRadius: 1,
              mt: 2
            }}
            onClick={() => RegisterUser()}
          >
            SIGNUP
          </Button>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2" sx={{ color: 'white' }} underline="always" onClick={() => props.setAuthState("login")}>
            Sign In
          </Link>
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

export default SignUp;
