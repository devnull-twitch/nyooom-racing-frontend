import React, { FC } from 'react';
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Result as IResult } from './data/interfaces';

interface RaceResultRowProps {
  result: IResult;
  startingPos: number;
};

export const RaceResultRow: FC<RaceResultRowProps> = ({ result, startingPos }) => {
  return (
    <>
      <TableRow>
        <TableCell sx={{ borderRight: ' 1px solid gray' }}>
          <Stack>
            <Typography variant="primaryname">{result.driver_name}</Typography>
            <Typography variant="secondaryname">{result.team_name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction={'row'}>
            <Typography>{startingPos}</Typography>
            <Typography>&nbsp;🡆&nbsp;</Typography>
            <Typography>{result.position}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography>{result.points}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RaceResultRow;