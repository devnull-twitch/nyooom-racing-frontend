import React from 'react';
import ReactDOM from 'react-dom/client';
import Standing from './Standing';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, defer, redirect, RouterProvider } from "react-router-dom";
import { RaceList } from './RaceList';
import axios from 'axios';
import { RaceEvent } from './RaceEvent';
import { 
  RaceEvent as IRaceEvent,
  Team as ITeam,
  RaceEventPayload as IRaceEventPayload
} from './data/interfaces';
import { AdminRoot } from './AdminRoot';
import { AdminListing } from './AdminListing';
import { AdminTeamCreate } from './AdminTeamCreate';
import { AdminTeamEdit } from './AdminTeamEdit';
import { AdminLogin } from './AdminLogin';
import { Root } from './Root';
import { AdminEventCreate } from './AdminEventCreate';
import moment from 'moment';
import { AdminEventUpdate } from './AdminEventUpdate';
import { DriverList } from './DriverList';

const axiosInstance = axios.create({
  baseURL: 'https://api.nyooom.racing/'
});

const sortAndMap = (input: string[]): number[] => {
  return [...input.sort((a, b) => {
    const [aIndex, _aID] = a.split("/").map(str => parseInt(str));
    const [bIndex, _bID] = b.split("/").map(str => parseInt(str));
    return aIndex - bIndex;
  })].map(data => {
    const [_index, id] = data.split("/").map(str => parseInt(str));
    return id;
  })
};

const getRaceEventFromFormData = (formData: FormData): IRaceEventPayload => {
  const startingIds = sortAndMap(formData.getAll("eventstarting").map(entry => entry as string));
  const resultingIDs = sortAndMap(formData.getAll("eventresult").map(entry => entry as string));
  
  return {
    name: (formData.get('eventname') || '').toString(),
    type: parseInt((formData.get('eventtype') || '1').toString()),
    race_date_unix: moment((formData.get('eventdate') || '').toString()).unix(),
    results: resultingIDs,
    starting_grid: startingIds
  };
};

const getTeamFromFormData = (formData: FormData): ITeam => {
  return {
    name: (formData.get('teamname') || '').toString(),
    drivers: [
      {name: (formData.get('driver1name') || '').toString()},
      {name: (formData.get('driver2name') || '').toString()},
    ]
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        path: "",
        element: <Standing />,
        loader: () => {
          return defer({
            teams: axiosInstance.get<ITeam[]>('/team'),
          });
        }
      },
      {
        path: "races",
        element: <RaceList />,
        loader: () => {
          return defer({
            races: axiosInstance.get<IRaceEvent[]>('/race'),
          });
        }
      },
      {
        path: "races/:raceId",
        element: <RaceEvent />,
        loader: ({ params }) => {
          return defer({
            race: axiosInstance.get<IRaceEvent>(`race/${params.raceId}`)
          });
        }
      },
      {
        path: "drivers",
        element: <DriverList />,
        loader: () => {
          return defer({
            teams: axiosInstance.get<ITeam[]>('/team'),
          });
        }
      },
      {
        path: "admin",
        element: <AdminRoot />,
        children: [
          {
            path: "",
            element: <AdminLogin axiosInstance={axiosInstance} />,
          },
          {
            path: "listing",
            element: <AdminListing />,
            loader: async () => {
              const teamRes = await axiosInstance.get<ITeam[]>('/team');
              const eventRes = await axiosInstance.get<IRaceEvent[]>('/race');
              
              return {
                teamRes: teamRes.data,
                eventRes: eventRes.data,
              };
            },
          },
          {
            path: "team/create",
            element: <AdminTeamCreate />,
            action: async ({ request }) => {
              const fd = await request.formData();
              const newTeam = getTeamFromFormData(fd);
              await axiosInstance.post(`/team`, newTeam, {
                auth: { 
                  username: (fd.get('username') || '').toString(),
                  password: (fd.get('password') || '').toString(),
                },
              });
              return redirect("/admin/listing");
            },
          },
          {
            path: "team/update/:teamId",
            element: <AdminTeamEdit />,
            loader: async ({ params }) => {
              const teamRes = await axiosInstance.get<ITeam>(`/team/${params.teamId}`);
              return teamRes.data;
            },
            action: async ({ request, params }) => {
              const fd = await request.formData();
              const updateTeam = getTeamFromFormData(fd);

              await axiosInstance.put(`/team/${params.teamId}`, updateTeam, {
                auth: { 
                  username: (fd.get('username') || '').toString(),
                  password: (fd.get('password') || '').toString(),
                },
              });
              return redirect("/admin/listing");
            },
          },
          {
            path: "team/delete/:teamId",
            action: async ({ params, request }) => {
              const fd = await request.formData();
              await axiosInstance.delete(`/team/${params.teamId}`, {
                auth: { 
                  username: (fd.get('username') || '').toString(),
                  password: (fd.get('password') || '').toString(),
                },
              });
              return redirect("/admin/listing");
            },
          },
          {
            path: "event/create",
            element: <AdminEventCreate />,
            loader: async () => {
              const teamRes = await axiosInstance.get<ITeam[]>('/team');
              return teamRes.data.flatMap((team) => team.drivers);
            },
            action: async ({ request }) => {
              const fd = await request.formData();
              const newEvent = getRaceEventFromFormData(fd);
              
              await axiosInstance.post(`/race`, newEvent, {
                auth: { 
                  username: (fd.get('username') || '').toString(),
                  password: (fd.get('password') || '').toString(),
                },
              });
              return redirect("/admin/listing");
            },
          },
          {
            path: "event/update/:id",
            element: <AdminEventUpdate />,
            loader: async ({ params }) => {
              const teamRes = await axiosInstance.get<ITeam[]>('/team');
              const eventRes = await axiosInstance.get<IRaceEvent>(`/race/${params.id}`)
              return [teamRes.data.flatMap((team) => team.drivers), eventRes.data];
            },
            action: async ({ request, params }) => {
              const fd = await request.formData();
              const newEvent = getRaceEventFromFormData(fd);
              
              await axiosInstance.put(`/race/${params.id}`, newEvent, {
                auth: { 
                  username: (fd.get('username') || '').toString(),
                  password: (fd.get('password') || '').toString(),
                },
              });
              return redirect("/admin/listing");
            },
          },
          {
            path: "event/delete/:teamId",
            action: async ({ params, request }) => {
              const fd = await request.formData();
              await axiosInstance.delete(`/race/${params.teamId}`, {
                auth: { 
                  username: (fd.get('username') || '').toString(),
                  password: (fd.get('password') || '').toString(),
                },
              });
              return redirect("/admin/listing");
            },
          }
        ]
      }
    ]
  },
]);

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
