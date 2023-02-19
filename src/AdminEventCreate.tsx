import { Button, Container, Grid } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { EventForm } from "./EventForm";
import { useCredentials } from "./user";
import { Driver as IDriver } from "./data/interfaces" 

export const AdminEventCreate: FC = () => {
  const [ username, password ] = useCredentials(); 
  const navigate = useNavigate();
  const driverList = useLoaderData() as IDriver[];

  useEffect(() => {
    if (username === '' && password === '') {
      navigate("/admin");
    }
  }, [navigate, username, password]);

  return (
    <Container>
      <Form method="post">
        <input type="hidden" name="username" value={username} />
        <input type="hidden" name="password" value={password} />
        <EventForm driverList={driverList} />
        <Grid item pt={2}>
          <Button variant="outlined" type="submit">
            Create event
          </Button>
        </Grid>
      </Form>
    </Container>
  );
};