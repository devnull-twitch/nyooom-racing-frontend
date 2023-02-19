import React, { FC, useState } from 'react';
import { Avatar, Grid, Stack, TableCell, TableRow, Typography } from "@mui/material";
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
      <TableRow onClick={onTeamRowSelect} style={{ cursor: 'pointer' }}>
        <TableCell>#{pos}</TableCell>
        <TableCell sx={{ borderRight: ' 1px solid gray' }}>
          <Grid container justifyContent="flex-start">
            <Stack direction="row" spacing={2}>
              <Avatar src={team.image} sx={{ bgcolor: red[50] }}>
                {team.name.substring(0, 1).toUpperCase()}
              </Avatar>
              <Stack>
                <Typography variant="primaryname">{team.name}</Typography>
                <Typography variant="tinypoints">{team.points || 0} points ( pre-season {team.pre_season_points || 0} )</Typography>
              </Stack>
            </Stack>
          </Grid>
        </TableCell>
        {team.drivers.map(d => (
          <TableCell key={d.name}>
            <Grid container>
              <Stack direction="row" spacing={2}>
                <Avatar src={d.image} sx={{ bgcolor: red[50] }}>
                  {d.name.substring(0, 1).toUpperCase()}
                </Avatar>
                <Stack>
                  <Typography variant="secondaryname">{d.name}</Typography>
                  <Typography variant="tinypoints">{d.points || 0} points ( pre-season {d.pre_season_points || 0} )</Typography>
                </Stack>
              </Stack>
            </Grid>
          </TableCell>
        ))}
      </TableRow>
      {showDetails && team.results && team.results.filter(r => (r.points || 0) > 0).map((r) => (
        <TableRow>
          <TableCell colSpan={2}>{r.event_name}</TableCell>
          <TableCell colSpan={2}>{r.driver_name} Scored {r.points} points coming in at position {r.position}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TeamRow;