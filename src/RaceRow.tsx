import React, { FC } from 'react';
import { TableCell, TableRow, Typography } from "@mui/material";
import { RaceEvent } from './data/interfaces';
import { Link } from 'react-router-dom';

interface RaceRowProps {
  event: RaceEvent;
};

export const RaceRow: FC<RaceRowProps> = ({ event }) => {
  const linkToRace = () => {

  };

  return (
    <Link to={`${event.id}`} style={{ display: 'table-row', textDecoration: 'none' }}>
      <TableCell sx={{ borderRight: ' 1px solid gray' }}>
        <Typography variant="primaryname">{event.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{event.type}</Typography>
      </TableCell>
    </Link>
  );
};

export default RaceRow;