"use client"
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, Grid, Link, Snackbar, Alert } from '@mui/material';
import '../../font.css';
import axios from "axios"
const ForgotPassword = (props) => {
  const [forgetdetails, setForgetDetails] = useState({ email: '', password: '', otp: '' })
  const [alert, setAlert] = useState("")
  const [verify, setVerify] = useState(false)
  const SendOtp = () => {
    if (!forgetdetails?.email) {
      setAlert("Please Provide Email!")
      return
    }
    const sendOtpQuery = {
      query: `
      mutation($email: String!){
        forgetPassword(email: $email)
      }
      `,
      variables: {
        email: forgetdetails?.email
      }
    };

    axios.post(
      // 'http://localhost:4000/graphql',
      'https://taskb.onrender.com/graphql',
      sendOtpQuery,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        if (response?.data?.data?.forgetPassword === "OTP Generated Successfully!") {
          setVerify(true)
        }
        else {
          setAlert(response?.data?.data?.forgetPassword)
        }
      })
      .catch(error => {
        console.log(error, "response")
      });
  }
  const ResetPassword = () => {
    if (!forgetdetails?.email) {
      setAlert("Please Provide Email!")
      return
    }
    if (!forgetdetails?.password) {
      setAlert("Please Provide Password!")
      return
    }
    if (!forgetdetails?.otp) {
      setAlert("Please Provide Otp!")
      return
    }
    const resetPasswordQuery = {
      query: `
      mutation($email: String!, $otp: String!, $password: String!){
        resetPassword(email: $email, otp: $otp, password: $password)
      }
      `,
      variables: {
        email: forgetdetails?.email,
        password: forgetdetails?.password,
        otp: forgetdetails?.otp
      }
    };

    axios.post(
      // 'http://localhost:4000/graphql',
      'https://taskb.onrender.com/graphql',
      resetPasswordQuery,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        if (response?.data?.data?.resetPassword === "Password Reset Successfully!") {
          setAlert(response?.data?.data?.resetPassword)
          setTimeout(() => {
            props.setAuthState("login")
          }, 3000)
        }
        else {
          setAlert(response?.data?.data?.resetPassword)
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
          maxHeight: 600, // Make the height more rectangular
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
        {!verify ? <>
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
                  height: 40, // Consistent height
                },
              }}
              InputLabelProps={{ style: { color: '#FFFFFF' } }}
              InputProps={{ style: { color: '#FFFFFF' } }}
              onChange={(e) => setForgetDetails({ ...forgetdetails, email: e.target.value })}
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
              onClick={() => SendOtp()}
            >
              SEND OTP
            </Button>
          </Grid>
        </> :
          <>
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
                onChange={(e) => setForgetDetails({ ...forgetdetails, password: e.target.value })}
                value={forgetdetails.password}
              />
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <TextField
                variant="outlined"
                label="Otp"
                type="text"
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
                onChange={(e) => setForgetDetails({ ...forgetdetails, otp: e.target.value })}
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
                onClick={() => ResetPassword()}
              >
                RESET PASSWORD
              </Button>
            </Grid>
          </>}
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

export default ForgotPassword;
