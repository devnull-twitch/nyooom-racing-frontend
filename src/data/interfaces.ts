export interface Driver {
    id?: number;
    name: string;
    image?: string;
    points?: number;
    pre_season_points?: number;
    prev_points?: number;
    prev_pre_season_points?: number;
}

export interface Result {
    event_name: string;
    driver_name: string;
    driver_id?: number;
    team_name?: string;
    points?: number;
    position?: number;
}

export interface RaceEvent {
    id?: number;
    name: string;
    race_date_unix: number;
    type: string;
    starting_grid: Result[];
    results: Result[];
}

export interface RaceEventPayload {
    id?: number;
    name: string;
    race_date_unix: number;
    type: number;
    starting_grid: number[];
    results: number[];
}

export interface Team {
    id?: number;
    drivers: Driver[];
    name: string;
    points?: number;
    pre_season_points?: number;
    prev_points?: number;
    prev_pre_season_points?: number;
    image?: string;
    results?: Result[];
}

export interface Teams {
    teams: Team[];
}