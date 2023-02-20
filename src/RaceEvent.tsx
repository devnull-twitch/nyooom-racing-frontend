import React, { FC, Suspense } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { RaceEvent as IRaceEvent } from './data/interfaces';
import { Await, useLoaderData } from 'react-router-dom';
import { RaceResultRow } from './RaceResultRow';
import { LoaderFallback } from './LoaderFallback';
import { AxiosResponse } from 'axios';

interface RaceEventProps {
}
  
export const RaceEvent: FC<RaceEventProps> = () => {
  const { race } = useLoaderData() as Record<string, any>;

  return (
    <Suspense fallback={<LoaderFallback />}>
      <Await resolve={race}>
        {(raceResponse: AxiosResponse<IRaceEvent>) => {
          return (
            <>
              <Typography variant='h2'>{race.name}</Typography>
              <Typography variant='h4'>{race.type}</Typography>
              <Typography variant='h3'>Results</Typography>
              <Table style={{ width: '50%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Driver</TableCell>
                    <TableCell width="110px">Finish</TableCell>
                    <TableCell width="90px">Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {raceResponse.data.results.map((r, index) => <RaceResultRow key={index} result={r} />)}              
                </TableBody>
              </Table>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};