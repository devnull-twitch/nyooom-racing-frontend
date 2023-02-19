import { MenuItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { FC } from "react";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Driver as IDriver } from "./data/interfaces"

export interface SortableDriverListProps {
  list: number[];
  driverList: IDriver[];
  fieldName: string;
  updateFn: (newState: number[]) => void;
}

export const SortableDriverList: FC<SortableDriverListProps> = ({ list, driverList, fieldName, updateFn }) => {
  return (
    <ol>
      {list.map((driverId, gridIndex) => {
        const driverObj = driverList.find(obj => obj.id === driverId);
        return (
          <MenuItem
            key={driverId}
            draggable
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              if (e.dataTransfer) {
                const [otherIndex, otherID] = e.dataTransfer.getData("text/plain").split("/").map(str => parseInt(str));
                updateFn(list.map((changeId, changeIndex) => {
                  if (changeIndex === otherIndex) {
                    return driverId;
                  } else if (changeIndex === gridIndex) {
                    return otherID;
                  } else {
                    return changeId;
                  }
                }));
              }
            }}
            onDragStart={e => e.dataTransfer.setData("text/plain", `${gridIndex}/${driverId}`)}
          >
            <input type="hidden" name={fieldName} value={`${gridIndex}/${driverId}`} />
            <Stack direction="row" alignItems="center">
              <DragHandleIcon />
              <Typography variant="secondaryname" component="span">{driverObj!.name}</Typography>
            </Stack>
          </MenuItem>
        );
      })}
    </ol>
  );
};