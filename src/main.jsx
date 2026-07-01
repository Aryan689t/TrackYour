import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Academics from "./academics.jsx"
import Projects from "./projects.jsx"
import DSA from "./DSA.jsx"
import Network from "./network.jsx"
import Semester from './Semester.jsx'
import { createBrowserRouter,RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {path:"/",
    element :<App/>},
  {path:"/academics",
    element:<Academics/>},
  {path:"/projects",
    element:<Projects/>},
     {path:"/DSA",
    element:<DSA/>},
    {path:"/network",
    element:<Network/>},
  {path:"/Semester",
    element:<Semester/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
