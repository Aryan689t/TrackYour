import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Academics from "./pages/academics/academics.jsx";
import Semester from "./pages/academics/Semester.jsx";
import DSA from "./pages/dsa/DSA.jsx";
import Projects from "./pages/projects/Projects.jsx";
import Network from "./pages/network/Network.jsx";
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
  {path:"/Semester/:id",
    element:<Semester/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
