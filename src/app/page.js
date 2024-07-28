"use client"
import { Box } from '@mui/material';
import Login from '@/components/Auth/Login';
import ForgotPassword from '@/components/Auth/ForgetPassword';
import SignUp from '@/components/Auth/SignUp';
import Dashboard from '@/components/MainComponent/Dashboard';
import AuditTrail from '@/components/MainComponent/AuditTrail';
import Sidebar from '@/components/MainComponent/SideBar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [authState, setAuthState] = useState("login");
  const [currentView, setCurrentView] = useState("dashboard");

  useEffect(() => {
    const gettoken = localStorage.getItem("token");
    if (!gettoken) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  return (
    <>
      {!auth ? (
        <>
          {authState === "login" ? (
            <Login setAuthState={setAuthState} />
          ) : authState === "register" ? (
            <SignUp setAuthState={setAuthState} />
          ) : authState === "forgetpassword" ? (
            <ForgotPassword setAuthState={setAuthState} />
          ) : ""}
        </>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Sidebar setCurrentView={setCurrentView} />
          {currentView === "dashboard" ? <Dashboard /> : <AuditTrail />}
        </Box>
      )}
    </>
  );
}