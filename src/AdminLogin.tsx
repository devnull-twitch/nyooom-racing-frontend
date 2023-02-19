import { Button, Container, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { AxiosInstance } from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCredentials, useSetUser } from "./user";

interface AdminTeamCreateProps {
  axiosInstance: AxiosInstance;
}

export const AdminLogin: FC<AdminTeamCreateProps> = ({ axiosInstance }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetUser();
  const navigate = useNavigate();
  const [storedUsername, storedPassword] = useCredentials();

  useEffect(() => {
    if (storedUsername !== '' || storedPassword !== '') {
      navigate("/admin/listing")
    }
  }, [storedUsername, storedPassword])

  const handleLogin = async () => {
    if (username === '' || password === '') {
      // todo handle error
      return
    }

    await axiosInstance.get(`/user-check`, {
      auth: { username, password },
    });

    setUser(username, password);
    navigate('listing');
  };

  return (
    <Container>
      <Grid container flexDirection={'column'}>
        <Grid item pt={3}>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" value={username} onChange={(e) => {
              setUsername(e.target.value);
            }} />
          </FormControl>
        </Grid>
        <Grid item pt={3}>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" value={password} onChange={(e) => {
              setPassword(e.target.value);
            }} />
          </FormControl>
        </Grid>
        <Grid item pt={2}>
          <Button variant="outlined" onClick={handleLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};