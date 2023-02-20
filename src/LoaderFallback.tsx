import { CircularProgress, Grid } from "@mui/material";
import React, { FC } from "react";

export const LoaderFallback: FC = () => {
  return (
    <Grid container justifyContent={"space-around"}>
      <CircularProgress />
    </Grid>
  );
};