import { FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { RaceEvent as IRaceEvent, Driver as IDriver } from "./data/interfaces";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment, { Moment } from "moment";
import { SortableDriverList } from "./SortableDriverList";

interface EventFormProps  {
  driverList: IDriver[];
  event?: IRaceEvent;
}

export const EventForm: FC<EventFormProps> = ({ event, driverList }) => {
  const [eventDate, setEventDate] = useState<Moment>(moment());
  const [startingGrid, setStartingGrid] = useState<number[]>([]);
  const [resultList, setResultList] = useState<number[]>([]);

  useEffect(() => {
    let grid: number[] = [];
    if (event) {
      grid = event.starting_grid.map(driver => driver.driver_id || 0);
    }
    grid = [
      ...grid,
      ...driverList
        .filter(driver => !grid.some(id => id === driver.id))
        .map(driver => driver.id || 0),
    ];
    setStartingGrid(grid);
  }, [event, driverList]);

  useEffect(() => {
    let grid: number[] = [];
    if (event) {
      grid = event.results.map(driver => driver.driver_id || 0);
    }
    grid = [
      ...grid,
      ...driverList
        .filter(driver => !grid.some(id => id === driver.id))
        .map(driver => driver.id || 0),
    ];
    setResultList(grid);
  }, [event, driverList]);

  return (
    <>
      <Grid container flexDirection={'column'}>
        <Grid item pt={3}>
          <FormControl>
            <InputLabel htmlFor="event-name">Event name</InputLabel>
            <Input id="event-name" defaultValue={event?.name || ""} name="eventname" />
          </FormControl>
        </Grid>
        <Grid item pt={3}>
          <FormControl>
            <DateTimePicker
              value={eventDate}
              onChange={(m) => setEventDate(m || moment())}
              label="Event date"
              inputFormat="MM/DD/YYYY"
              renderInput={(params) => <TextField name="eventdate" {...params} />}
            />
          </FormControl>
        </Grid>
        <Grid item pt={3}>
          <FormControl>
            <InputLabel htmlFor="event-type">Event type</InputLabel>
            <Select defaultValue={event?.type || 1} name="eventtype" id="event-type">
              <MenuItem value={1}>Race</MenuItem>
              <MenuItem value={2}>Sprint</MenuItem>
              <MenuItem value={3}>Pre-Season race</MenuItem>
              <MenuItem value={4}>Pre-Season sprint</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item pt={2}>
          <Typography variant="primaryname">Starting grid</Typography>
          <SortableDriverList
            fieldName="eventstarting"
            driverList={driverList}
            list={startingGrid}
            updateFn={setStartingGrid}
          />
        </Grid>
        <Grid item pt={2}>
          <Typography variant="primaryname">Results</Typography>
          <SortableDriverList
            fieldName="eventresult"
            driverList={driverList}
            list={resultList}
            updateFn={setResultList}
          />
        </Grid>
      </Grid>
    </>
  )
};