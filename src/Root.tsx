import { AppBar, Container, CssBaseline, Grid, MenuItem, MenuList, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React, { FC } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import darkTheme from './theme';
import Background from './Background';
import { Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from "./user";
import { LocalizationProvider } from "@mui/x-date-pickers";

export const Root : FC = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserProvider>
          <CssBaseline />
          <Grid container style={{ minHeight: '100vh' }} justifyContent="flex-start" flexDirection="column">
            <Background />
            <Grid xs={12} item={true} style={{ flexBasis: "auto" }}>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <img
                    src="/marbles-racing-championship-high-resolution-logo-white-on-transparent-background.png"
                    alt="Nyooom Marbles Racing Championship Logo"
                    style={{ maxWidth: '40px', marginRight: '8px', cursor: 'pointer' }}
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                  <Typography 
                    variant="h6"
                    color="inherit"
                    style={{ cursor: 'pointer' }}
                    component="div"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Nyooom - Marbles Racing Championship
                  </Typography>

                  <MenuList style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'row-reverse' }}>
                    <MenuItem>
                      <Typography component={'a'} onClick={()  => {
                        navigate("/races");
                      }}>Races</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography component={'a'} onClick={() => {
                        navigate("/drivers");
                      }}>Drivers</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography component={'a'} onClick={() => {
                        navigate("/");
                      }}>Teams</Typography>
                    </MenuItem>
                  </MenuList>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid xs={12} mt={5} item={true} style={{ flexBasis: "auto" }}>
              <Container style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                <Outlet />
              </Container>
            </Grid>
            <div style={{ flex: '1 0 auto' }} />
            <Grid xs={12} mb={3} item={true} style={{ flexBasis: "auto" }}>
              <Container>
                <Typography component="a" variant="unobtrusive" onClick={() => navigate("/admin")}>
                  Admin stuff
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </UserProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};