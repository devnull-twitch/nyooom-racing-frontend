import { FormControl, Grid, Input, InputLabel } from "@mui/material";
import React, { FC } from "react";
import { Team as ITeam } from "./data/interfaces";

interface TeamFormProps  {
  team?: ITeam;
}

export const TeamForm: FC<TeamFormProps> = ({ team }) => {
  return (
    <>
      <Grid container flexDirection={'column'}>
        <Grid item pt={3}>
          <FormControl>
            <InputLabel htmlFor="team-name">Team Name</InputLabel>
            <Input id="team-name" defaultValue={team?.name || ""} name="teamname" />
          </FormControl>
        </Grid>
        <Grid item pt={3}>
          <FormControl>
            <InputLabel htmlFor="driver1-name">Driver #1</InputLabel>
            <Input id="driver1-name" defaultValue={team?.drivers[0].name || ""} name="driver1name" />
          </FormControl>
        </Grid>
        <Grid item pt={3}>
          <FormControl>
            <InputLabel htmlFor="driver2-name">Driver #2</InputLabel>
            <Input id="driver2-name" defaultValue={team?.drivers[1].name || ""} name="driver2name" />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
};