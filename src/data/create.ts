import { open, readdir } from 'node:fs/promises';
import { join } from 'node:path';

interface DriverResult {
    position: number;
    points: number;
}

interface Driver {
    image: string;
    name: string;
    points: number;
    results: DriverResult[];
}

interface TeamResult {
    driver: string;
    position: number;
    points: number;
}

interface Team {
    image: string;
    name: string;
    points: number;
    drivers: Driver[];
    results: TeamResult[];
}

interface Teams {
    teams:  Team[];
}

interface Race {
    name: string;
    give_points: boolean;
    standings: string[];
}

const teamFileHandle = await open('src/data/teams.json');
const teamFileStr = await teamFileHandle.readFile({encoding: 'utf-8'});
const teamsData = JSON.parse(teamFileStr) as Teams;

const raceResultFiles = await readdir('src/data/races');
for (const f of raceResultFiles) {
    const fh = await open(join('src/data/races', f));
    const buf = await fh.readFile({encoding: 'utf-8'});
    const raceResultData = JSON.parse(buf) as Race;

    for (const [index, driverName] of raceResultData.standings.entries()) {
        const points = raceResultData.standings.length - index;
        const matchingTeamIndex = teamsData.teams.findIndex((t) => t.drivers.some((d) => d.name === driverName));
        if (matchingTeamIndex !== -1) {
            if (isNaN(teamsData.teams[matchingTeamIndex].points)) {
                teamsData.teams[matchingTeamIndex].points = 0;
            }
            teamsData.teams[matchingTeamIndex].points += points;

            if (!teamsData.teams[matchingTeamIndex].results) {
                teamsData.teams[matchingTeamIndex].results = [];
            }
            teamsData.teams[matchingTeamIndex].results.push({
                driver: driverName,
                points: points,
                position: index + 1
            });

            const driverIndex = teamsData.teams[matchingTeamIndex].drivers.findIndex((d) => d.name === driverName);
            if (isNaN(teamsData.teams[matchingTeamIndex].drivers[driverIndex].points)) {
                teamsData.teams[matchingTeamIndex].drivers[driverIndex].points = 0;
            }
            teamsData.teams[matchingTeamIndex].drivers[driverIndex].points += points;

            if (!teamsData.teams[matchingTeamIndex].drivers[driverIndex].results) {
                teamsData.teams[matchingTeamIndex].drivers[driverIndex].results = [];
            }
            teamsData.teams[matchingTeamIndex].drivers[driverIndex].results.push({
                points: points,
                position: index + 1
            });
        }
    }
}

const outFileHandle = await open('public/data.json', 'w');
outFileHandle.writeFile(JSON.stringify(teamsData));