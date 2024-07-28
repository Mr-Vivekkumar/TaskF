"use client";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  Typography, AppBar, Card, Grid, IconButton, Avatar, Tooltip,
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const AuditTrail = () => {
  const [auditData, setAuditData] = useState([]);

  useEffect(() => {
    const fetchAuditData = async () => {
      try {
        const response = await axios.get('/auditTrail.json');
        setAuditData(response.data);
      } catch (error) {
        console.error('Error fetching audit data:', error);
      }
    };

    fetchAuditData();
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#09111B', color: 'white', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#0A1929', boxShadow: 'none', mb: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>
          <Grid item>
            <Typography variant="h6">Audit Trail</Typography>
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
        <Grid item xs={12}>
          <Card sx={{ p: 2, backgroundColor: '#0A1929', color: 'white' }}>
            <Typography variant="h6">Audit Logs</Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: '#0A1929' }}>
              <Table sx={{ minWidth: 650 }} aria-label="audit trail table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>Timestamp</TableCell>
                    <TableCell sx={{ color: 'white' }}>Action</TableCell>
                    <TableCell sx={{ color: 'white' }}>Entity</TableCell>
                    <TableCell sx={{ color: 'white' }}>Details</TableCell>
                    <TableCell sx={{ color: 'white' }}>Performed By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auditData.map((log, index) => (
                    <TableRow key={index} sx={{ backgroundColor: index % 2 ? '#0A1929' : '#28333F' }}>
                      <TableCell sx={{ color: 'white' }}>{log.timestamp}</TableCell>
                      <TableCell sx={{ color: 'white' }}>{log.action}</TableCell>
                      <TableCell sx={{ color: 'white' }}>{log.entity}</TableCell>
                      <TableCell sx={{ color: 'white' }}>{log.details}</TableCell>
                      <TableCell sx={{ color: 'white' }}>{log.performed_by}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuditTrail;
