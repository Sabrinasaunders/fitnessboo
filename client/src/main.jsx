import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleExercise from './pages/SingleExercise';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import PushList from './pages/PushList';
import PullList from './pages/PullList';
import LegsList from './pages/LegsList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profiles/:username',
        element: <Profile />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleExercise />
      }, {
        path: '/push',
        element: <PushList />
      }, {
        path: '/pull',
        element: <PullList />
      }, {
        path: '/legs',
        element: <LegsList />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
