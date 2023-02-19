import React, { FC } from 'react';
import { TableCell, TableRow, Typography } from "@mui/material";
import { RaceEvent } from './data/interfaces';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

interface RaceRowProps {
  event: RaceEvent;
};

export const RaceRow: FC<RaceRowProps> = ({ event }) => {
  const navigate = useNavigate();

  return (
    <TableRow style={{ cursor: 'pointer' }} onClick={() => navigate(`${event.id}`)}>
      <TableCell sx={{ borderRight: ' 1px solid gray' }}>
        <Typography variant="primaryname">{event.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{moment.unix(event.race_date_unix).format("DD.MM.YYYY")}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{event.type}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default RaceRow;