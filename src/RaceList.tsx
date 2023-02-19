import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { FC, Suspense } from 'react';
import { RaceEvent as IRaceEvent } from './data/interfaces';
import RaceRow from './RaceRow';
import { Await, useLoaderData } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { LoaderFallback } from './LoaderFallback';

export const RaceList: FC = () => {
  const { races } = useLoaderData() as Record<string, any>;

  return (
    <Suspense fallback={<LoaderFallback />}>
      <Await resolve={races}>
        {(resolvedRaces: AxiosResponse<IRaceEvent[]>) => (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="40px">Event</TableCell>
                <TableCell width="30%">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resolvedRaces.data.map((r, index) => <RaceRow key={index} event={r} />)}  
            </TableBody>
          </Table>
        )}
      </Await>
    </Suspense>  
  );
};