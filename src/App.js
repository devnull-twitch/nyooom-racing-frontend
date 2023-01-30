import { 
  AppBar, Container, Grid,
  Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import TeamRow from './TeamRow.tsx';
import { TwitchPlayer } from 'react-twitch-embed';
import Background from './Background';

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const sortTeams = (a, b) => {
      return a.points - b.points;
    }
  
    const loadTeams = async () => {
      const resp = await fetch('/data.json');
      const jsonData = await resp.json();
      setTeams(jsonData.teams.sort(sortTeams));
    };

    loadTeams();
  }, []);

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
          <Table xs={6}>
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
