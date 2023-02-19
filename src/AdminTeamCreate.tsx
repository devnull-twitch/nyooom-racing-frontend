import { Button, Container, Grid } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { TeamForm } from "./TeamForm";
import { useCredentials } from "./user";

export const AdminTeamCreate: FC = () => {
  const [ username, password ] = useCredentials(); 
  const navigate = useNavigate();

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
        <TeamForm />
        <Grid item pt={2}>
          <Button variant="outlined" type="submit">
            Create team
          </Button>
        </Grid>
      </Form>
    </Container>
  );
};