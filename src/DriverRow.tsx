import React, { FC, useState } from 'react';
import { Avatar, Grid, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { red, green } from '@mui/material/colors';
import { Driver as IDriver, Team as ITeam, Result as IResult } from './data/interfaces';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import EastIcon from '@mui/icons-material/East';

interface DriverRowProps {
  pos: number;
  prevPos: number;
  driver: IDriver;
  team?: ITeam;
};

export const DriverRow: FC<DriverRowProps> = ({ pos, prevPos, driver, team }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const onTeamRowSelect = () => setShowDetails(!showDetails);

  const filterDriverAndPoints = (r: IResult): boolean => {
    return r.driver_name === driver.name && (r.points || 0) > 0;
  }

  let changeIndicator: any = '';
  if (prevPos > 0) {
    if (prevPos < pos) {
      changeIndicator = <SouthEastIcon sx={{ color: red[500] }} />;
    } else if (prevPos === pos) {
      changeIndicator = <EastIcon />;
    } else {
      changeIndicator = <NorthEastIcon sx={{ color: green[500] }} />;
    }
  }

  return (
    <>
      <TableRow onClick={onTeamRowSelect} style={{ cursor: 'pointer' }}>
        <TableCell>#{pos} {changeIndicator}</TableCell>
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
      {showDetails && team !== undefined && team.results && team.results.filter(filterDriverAndPoints).map((r) => (
        <TableRow>
          <TableCell colSpan={2}>{r.event_name}</TableCell>
          <TableCell colSpan={2}>{r.driver_name} Scored {r.points} points coming in at position {r.position}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default DriverRow;