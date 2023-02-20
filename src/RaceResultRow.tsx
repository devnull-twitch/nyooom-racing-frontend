import React, { FC } from 'react';
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Result as IResult } from './data/interfaces';

interface RaceResultRowProps {
  result: IResult;
};

export const RaceResultRow: FC<RaceResultRowProps> = ({ result }) => {
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
          <Typography>{result.position}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{result.points}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RaceResultRow;