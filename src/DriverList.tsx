import React, { FC, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { LoaderFallback } from "./LoaderFallback";
import { Team as ITeam, Driver as IDriver } from "./data/interfaces";
import { AxiosResponse } from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DriverRow from "./DriverRow";

export const DriverList: FC = () => {
  const { teams } = useLoaderData() as Record<string, any>;

  const toDrivers = (team: ITeam): IDriver[] => {
    return team.drivers;
  };

  const sortDrivers = (a: IDriver, b: IDriver) => {
    if ((b.points || 0) === (a.points || 0)) {
      return (b.pre_season_points || 0) - (a.pre_season_points || 0);
    }
    return (b.points || 0) - (a.points || 0);
  };

  
  const getTeam = (teams: ITeam[], driver: IDriver): ITeam | undefined => {
    return teams.find(t => t.drivers.some(d => d.id === driver.id));
  }

  return (
    <Suspense fallback={<LoaderFallback />}>
      <Await resolve={teams}>
        {(teamResponse: AxiosResponse<ITeam[]>) => (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="40px">Pos</TableCell>
                <TableCell width="60%">Driver</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamResponse.data
                .flatMap(toDrivers)
                .sort(sortDrivers)
                .map((driver, index) => <DriverRow key={index} driver={driver} team={getTeam(teamResponse.data, driver)} pos={index + 1} />)}              
            </TableBody>
          </Table>
        )}
      </Await>
    </Suspense>
  );
};