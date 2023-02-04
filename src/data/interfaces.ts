export interface DriverResult {
    event_name: string;
    position: number;
    points: number;
}

export interface Driver {
    image: string;
    name: string;
    points: number;
    results: DriverResult[];
}

export interface TeamResult {
    event_name: string;
    driver: string;
    position: number;
    points: number;
}

export interface Team {
    image: string;
    name: string;
    points: number;
    drivers: Driver[];
    results: TeamResult[];
}

export interface Teams {
    teams:  Team[];
}

export interface Race {
    name: string;
    give_points: boolean;
    standings: string[];
}