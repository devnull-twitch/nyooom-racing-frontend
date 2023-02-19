import { Button, MenuItem, MenuList, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCredentials } from './user';

export const AdminRoot: FC = () => {
  const navigate = useNavigate();
  const [ username, password ] = useCredentials();

  return (
    <>
      {(username !== '' && password !== '') && (
        <MenuList style={{ 
          width: '400px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <MenuItem disabled>
            <Typography variant='primaryname'>Hi {username}</Typography>
          </MenuItem>
          <MenuItem style={{ padding: 0 }}>
            <Button variant='text' onClick={() => navigate("/admin/listing")}>Listings</Button>
          </MenuItem>
          <MenuItem style={{ padding: 0 }}>
            <Button variant='text' onClick={() => navigate("/admin/team/create")}>Create team</Button>
          </MenuItem>
          <MenuItem style={{ padding: 0 }}>
            <Button variant='text' onClick={() => navigate("/admin/event/create")}>Create event</Button>
          </MenuItem>
        </MenuList>
      )}
      <Outlet />
    </>
  );
};