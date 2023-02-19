import { Button, Container, Grid } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { Team as ITeam } from "./data/interfaces";
import { TeamForm } from "./TeamForm";
import { useCredentials } from "./user";

export const AdminTeamEdit: FC = () => {
  const [ username, password ] = useCredentials(); 
  const team = useLoaderData() as ITeam;
  const navigate = useNavigate();

  useEffect(() => {
    if (username === '' && password === '') {
      navigate("/admin");
    }
  }, [navigate, username, password]);

  return (
    <Container>
      <Form method="put">
      <input type="hidden" name="username" value={username} />
        <input type="hidden" name="password" value={password} />
        <TeamForm team={team} />
        <Grid item pt={2}>
          <Button variant="outlined" type="submit">
            Update team
          </Button>
        </Grid>
      </Form>
    </Container>
  );
};