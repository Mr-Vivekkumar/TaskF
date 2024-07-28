"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography, AppBar, Card, CardContent, Grid, IconButton, Avatar, Tooltip,
  Box
} from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PeopleIcon from '@mui/icons-material/People';
import RouterIcon from '@mui/icons-material/Router';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { LineChart, ComposedChart, AreaChart, Area, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';


const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartResponse = await axios.get('/chartData.json');
        const tableResponse = await axios.get('/tableData.json');
        console.log('====================================');
        console.log(tableResponse.data.data);
        console.log('====================================');

        setChartData(chartResponse.data.data);
        setTableData(tableResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const DashboardCard = ({ icon: Icon, title, value }) => (
    <Card style={{ padding: '16px', backgroundColor: '#4984B5', color: 'white', borderRadius: 10 }}>
      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
        <Icon fontSize="large" style={{ fontSize: 80, marginRight: '32px' }} />
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1" align="center" style={{ margin: '10px 0' }}>
            {title}
          </Typography>
          <Typography fontFamily='Montserrat' fontSize='28px' fontWeight='700' lineHeight='24px' textAlign='center'
            variant="h4" align="center">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#09111B', color: 'white', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#0A1929', boxShadow: 'none', mb: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>
          <Grid item>
            <Typography variant="h6">Dashboard</Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Profile">
              <IconButton>
                <Avatar alt="User" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </AppBar>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardCard icon={SyncAltIcon} title="TOTAL DATA EXCHANGED" value="80.4 TB" />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard icon={PeopleIcon} title="HOTSPOT USERS" value="23K/24.2K" />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard icon={RouterIcon} title="ONLINE ROUTERS" value="201/545" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard icon={DirectionsBoatIcon} title="FLEETS" value="45" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard icon={ApartmentIcon} title="TENANTS" value="23" />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3, backgroundColor: '#0A1929' }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, backgroundColor: '#0A1929', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="white">
              Tenants Data Usage Pattern
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData}>
                <XAxis dataKey="date" stroke="white" />
                <YAxis stroke="white" />
                <RechartsTooltip />
                <Area type="monotone" dataKey="usage" fill="white" stroke="#4984B5" strokeWidth='5px' />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, backgroundColor: '#0A1929', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="white">
              Top Tenants
            </Typography>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {tableData.map((row, index) => (
                <Box key={index} sx={{ backgroundColor: index % 2 ? '#0A1929' : '#28333F', display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="white">{row.no}</Typography>
                  <Typography color="white">{row.name}</Typography>
                  <Typography color="white">{row.dataUsage}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;