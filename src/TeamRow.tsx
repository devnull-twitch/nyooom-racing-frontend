import React, { FC } from 'react';
import { Avatar, Grid, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { red } from '@mui/material/colors';

interface DriverData {
  name: string;
  points: number;
  image: string;
}

interface TeamData {
  name: string;
  points: number;
  image: string;
  drivers: DriverData[];
};

interface TeamRowProps {
  pos: number;
  team: TeamData;
};

export const TeamRow: FC<TeamRowProps> = ({ pos, team }) => {
  return (
    <TableRow>
      <TableCell>#{pos}</TableCell>
      <TableCell sx={{ borderRight: ' 1px solid gray' }}>
        <Grid container justifyContent="flex-start">
          <Stack direction="row" spacing={2}>
            <Avatar src={team.image} sx={{ bgcolor: red[50] }}>
              {team.name.substring(0, 1).toUpperCase()}
            </Avatar>
            <Stack>
              <Typography variant="teamname">{team.name}</Typography>
              <Typography variant="tinypoints">{team.points} points</Typography>
            </Stack>
          </Stack>
        </Grid>
      </TableCell>
      {team.drivers.map(d => (
        <TableCell>
          <Grid container justifyContent="center">
            <Stack direction="row" spacing={2}>
              <Avatar src={d.image} sx={{ bgcolor: red[50] }}>
                {d.name.substring(0, 1).toUpperCase()}
              </Avatar>
              <Stack>
                <Typography variant="username">{d.name}</Typography>
                <Typography variant="tinypoints">{d.points} points</Typography>
              </Stack>
            </Stack>
          </Grid>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TeamRow;