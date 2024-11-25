import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import "./index.css";
import TimersView from "./views/TimersView";
import DocumentationView from "./views/DocumentationView";
import Countdown from "./components/timers/Countdown";
import Stopwatch from "./components/timers/Stopwatch";
import Tabata from "./components/timers/Tabata";
import XY from "./components/timers/XY";
import AddTimeView from "./views/AddTimerHomeView";
import { TimerProvider } from "./components/contex/TimerContext";

// Main layout with links to Timers and Documentation
const PageIndex = () => {
  return (
    <div>
      <h1>Assignment 2</h1>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/add">Add Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

// Configure the routes
const router = createHashRouter([
  {
    path: "/",
    element: <PageIndex />,
    children: [
      {
        index: true,
        element: <TimersView />,
      },
      {
        path: "add",
        element: <AddTimeView />,
      },
      {
        path: "docs",
        element: <DocumentationView />,
      },
      {
        path: "stopwatch",
        element: <Stopwatch />,
      },
      {
        path: "countdown",
        element: <Countdown />,
      },
      {
        path: "xy",
        element: <XY />,
      },
      {
        path: "tabata",
        element: <Tabata />,
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimerProvider>
      <RouterProvider router={router} />
    </TimerProvider>
  </StrictMode>
);