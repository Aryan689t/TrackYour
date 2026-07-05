import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Academics from "./pages/academics/academics.jsx";
import Semester from "./pages/academics/Semester.jsx";

import Projects from "./pages/projects/Projects.jsx";
import Network from "./pages/network/Network.jsx";
import Status from "./pages/dsa/Status.jsx";
import History from "./pages/dsa/History.jsx";
import Playlists from "./pages/dsa/Playlists.jsx";
import Roadmap from "./pages/dsa/Roadmap.jsx";
import Journal from "./pages/dsa/Journal.jsx";


import { createBrowserRouter,RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {path:"/",
    element :<App/>},
  {path:"/academics",
    element:<Academics/>},
  {path:"/projects",
    element:<Projects/>},
    {path:"/network",
    element:<Network/>},
  {path:"/Semester/:id",
    element:<Semester/>},
   {path:"/Status",
    element:<Status/>} ,
    {path:"/History",
    element:<History/>} ,
    {path:"/Playlists",
    element:<Playlists/>} ,
    {path:"/Roadmap",
    element:<Roadmap/>}, 
    {path:"/Journal",
    element:<Journal/>}, 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
