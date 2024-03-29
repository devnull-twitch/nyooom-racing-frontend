import { 
  Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import React, { FC, Suspense } from 'react';
import TeamRow from './TeamRow';
import { Team as ITeam } from './data/interfaces';
import { Await, useLoaderData } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { LoaderFallback } from './LoaderFallback';

export const Standing: FC = () => {
  const { teams } = useLoaderData() as Record<string, any>;

  const sortTeams = (a: ITeam, b: ITeam) => {
    if ((b.points || 0) === (a.points || 0)) {
      return (b.pre_season_points || 0) - (a.pre_season_points || 0);
    }
    return (b.points || 0) - (a.points || 0);
  };

  const sortTeamsByPrevPoints = (a: ITeam, b: ITeam) => {
    if ((b.prev_points || 0) === (a.prev_points || 0)) {
      return (b.prev_pre_season_points || 0) - (a.prev_pre_season_points || 0);
    }
    return (b.prev_points || 0) - (a.prev_points || 0);
  };

  return (
    <Suspense fallback={<LoaderFallback />}>
      <Await resolve={teams}>
        {(teamResponse: AxiosResponse<ITeam[]>) => {
          const currentTeamList = [...teamResponse.data].sort(sortTeams);
          const prevTeamList = [...teamResponse.data].sort(sortTeamsByPrevPoints);

          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="40px">Pos</TableCell>
                  <TableCell width="30%">Team</TableCell>
                  <TableCell align="center">Driver #1</TableCell>
                  <TableCell align="center">Driver #2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTeamList.map((t, index) => 
                  <TeamRow 
                    key={index}
                    team={t}
                    pos={index + 1}
                    prevPos={prevTeamList.findIndex((checkTeam) => checkTeam.id === t.id) + 1}
                  />
                )}              
              </TableBody>
            </Table>
          );
        }}
      </Await>
    </Suspense>
  );
}

export default Standing;
