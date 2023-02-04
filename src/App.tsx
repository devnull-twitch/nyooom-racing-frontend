import { 
  AppBar, Box, Container, Grid,
  Tab,
  Table, TableBody, TableCell, TableHead, TableRow, Tabs, Toolbar, Typography
} from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import TeamRow from './TeamRow';
import { TwitchPlayer } from 'react-twitch-embed';
import Background from './Background';
import { Team, Teams } from './data/interfaces'

export const App: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    const sortTeams = (a: Team, b: Team) => {
      console.log(a, b);
      return (b.points || 0) - (a.points || 0);
    }
  
    const loadTeams = async () => {
      const resp = await fetch('/data.json');
      const jsonData = await resp.json() as Teams;
      setTeams(jsonData.teams.sort(sortTeams));
    };

    loadTeams();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Grid container>
      <Background />
      <Grid xs={12}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <img
              src="/marbles-racing-championship-high-resolution-logo-white-on-transparent-background.png"
              alt="Nyooom Marbles Racing Championship Logo"
              style={{ maxWidth: '40px', marginRight: '8px' }}
            />
            <Typography variant="h6" color="inherit" component="div">
              Nyooom - Marbles Racing Championship
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid xs={12}>
        <Grid container justifyContent="center">
          <TwitchPlayer channel="kaat_nyooom" />
        </Grid>
      </Grid>
      <Grid xs={12} mt={5}>
        <Container style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
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
              {teams.map((t, index) => <TeamRow key={index} team={t} pos={index + 1} />)}              
            </TableBody>
          </Table>
        </Container>
      </Grid>
    </Grid>
  );
}

export default App;
