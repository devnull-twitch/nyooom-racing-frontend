import { 
  IconButton, Typography,
  Table, TableBody, TableCell, TableHead, TableRow, Stack 
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Team as ITeam, RaceEvent as IRaceEvent } from './data/interfaces';
import { useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { useCredentials } from './user';

export const AdminListing: FC = () => {
  const { teamRes, eventRes } = useLoaderData() as { teamRes: ITeam[], eventRes: IRaceEvent[] };
  const [ username, password ] = useCredentials(); 
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (username === '' && password === '') {
      navigate("/admin");
    }
  }, [navigate, username, password]);

  return (
    <>
      <Typography variant="h4">Teams</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Team name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamRes.map((t, index) => (
            <TableRow key={index}>
              <TableCell>
                <Stack direction={'row'}>
                  <IconButton onClick={() => navigate(`/admin/team/update/${t.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => submit(new URLSearchParams({ username, password }), {
                    action: `/admin/team/delete/${t.id}`,
                    method: 'delete',
                  })}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography variant="primaryname">{t.name}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h4" mt={8}>Events</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Event name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventRes.map((e, index) => (
            <TableRow key={index}>
              <TableCell>
                <Stack direction={'row'}>
                  <IconButton onClick={() => navigate(`/admin/event/update/${e.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => submit(new URLSearchParams({ username, password }), {
                    action: `/admin/event/delete/${e.id}`,
                    method: 'delete',
                  })}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography variant="primaryname">{e.name}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};