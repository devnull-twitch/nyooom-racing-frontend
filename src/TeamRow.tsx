import React, { FC, useState } from 'react';
import { Avatar, Grid, Stack, Table, TableCell, TableRow, Typography } from "@mui/material";
import { red } from '@mui/material/colors';
import { Team } from './data/interfaces';

interface TeamRowProps {
  pos: number;
  team: Team;
};

export const TeamRow: FC<TeamRowProps> = ({ pos, team }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const onTeamRowSelect = () => setShowDetails(!showDetails);

  return (
    <>
      <TableRow onClick={onTeamRowSelect}>
        <TableCell>#{pos}</TableCell>
        <TableCell sx={{ borderRight: ' 1px solid gray' }}>
          <Grid container justifyContent="flex-start">
            <Stack direction="row" spacing={2}>
              <Avatar src={team.image} sx={{ bgcolor: red[50] }}>
                {team.name.substring(0, 1).toUpperCase()}
              </Avatar>
              <Stack>
                <Typography variant="teamname">{team.name}</Typography>
                <Typography variant="tinypoints">{team.points || 0} points</Typography>
              </Stack>
            </Stack>
          </Grid>
        </TableCell>
        {team.drivers.map(d => (
          <TableCell key={d.name}>
            <Grid container justifyContent="center">
              <Stack direction="row" spacing={2}>
                <Avatar src={d.image} sx={{ bgcolor: red[50] }}>
                  {d.name.substring(0, 1).toUpperCase()}
                </Avatar>
                <Stack>
                  <Typography variant="username">{d.name}</Typography>
                  <Typography variant="tinypoints">{d.points || 0} points</Typography>
                </Stack>
              </Stack>
            </Grid>
          </TableCell>
        ))}
      </TableRow>
      {showDetails && team.results && team.results.map((r) => (
        <TableRow>
          <TableCell colSpan={2}>{r.event_name}</TableCell>
          <TableCell colSpan={2}>{r.driver} Scored {r.points} points coming in at position {r.position}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TeamRow;