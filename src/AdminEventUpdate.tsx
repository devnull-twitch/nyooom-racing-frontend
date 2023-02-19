import { Button, Container, Grid } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { EventForm } from "./EventForm";
import { useCredentials } from "./user";
import { Driver as IDriver, RaceEvent as IRaceEvent } from "./data/interfaces" 

export const AdminEventUpdate: FC = () => {
  const [ username, password ] = useCredentials(); 
  const navigate = useNavigate();
  const [driverList, event] = useLoaderData() as [IDriver[], IRaceEvent];

  const transformEventToPrefill = (event: IRaceEvent): IRaceEvent => {
    const typeMapping: Record<string, string> = {
      "Race": "1",
      "Sprint": "2",
      "Pre-Season race": "3",
      "Pre-Season sprint": "4",
    };
    event.type = typeMapping[event.type];
    return event
  }

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
        <EventForm driverList={driverList} event={transformEventToPrefill(event)} />
        <Grid item pt={2}>
          <Button variant="outlined" type="submit">
            Update event
          </Button>
        </Grid>
      </Form>
    </Container>
  );
};