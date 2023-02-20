import React, { FC, useState } from 'react';
import { Avatar, Grid, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { red } from '@mui/material/colors';
import { Driver as IDriver, Team as ITeam } from './data/interfaces';

interface DriverRowProps {
  pos: number;
  driver: IDriver;
  team?: ITeam;
};

export const DriverRow: FC<DriverRowProps> = ({ pos, driver, team }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const onTeamRowSelect = () => setShowDetails(!showDetails);

  return (
    <>
      <TableRow onClick={onTeamRowSelect} style={{ cursor: 'pointer' }}>
        <TableCell>#{pos}</TableCell>
        <TableCell key={driver.name}>
          <Grid container>
            <Stack direction="row" spacing={2}>
              <Avatar src={driver.image} sx={{ bgcolor: red[50] }}>
                {driver.name.substring(0, 1).toUpperCase()}
              </Avatar>
              <Stack>
                <Typography variant="primaryname">{driver.name}</Typography>
                {team !== undefined && (
                  <Typography variant="secondaryname">{team.name}</Typography>
                )}
              </Stack>
            </Stack>
          </Grid>
        </TableCell>
        <TableCell>
          <Typography variant="primaryname">{driver.points || 0} points ( pre-season {driver.pre_season_points || 0} )</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DriverRow;