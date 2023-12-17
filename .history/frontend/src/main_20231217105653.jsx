import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import HomePage from './Homepage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import PokemonDetail from './PokemonDetail';
import Login from './Login';
import CreateUser from './CreateUser';
import All from './AllStatusUpdatesPage';
import UserPage from './UserPage';

const router = createBrowserRouter([
  {
    path: '/pokemon/:pokemonId',
    element: <PokemonDetail />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <CreateUser />
  },
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/all',
    element: <All />
  },
  {
    path: '/user/:username',
    element: <UserPage />
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
