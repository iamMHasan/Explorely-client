import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './Layout/Main';
import { useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlice';
import AddEdit from './pages/AddEdit';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRote from './component/PrivateRote';
import NotFound from './pages/NotFound';
import TagTours from './pages/TagTours';

function App() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setUser(user))
  },[user, dispatch])
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement : <NotFound/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/tours/search",
          element: <Home />,
        },
        {
          path: "/tours/tag/:tag",
          element: <TagTours />,
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/signup",
          element: <Register />
        },
        {
          path : "/addTour",
          element : <PrivateRote><AddEdit/></PrivateRote>
        },
        {
          path : "/editTour/:id",
          element : <PrivateRote><AddEdit/></PrivateRote>
        },
        {
          path : "/tour/:id",
          element : <SingleTour/>
        },
        {
          path : "/dashboard",
          element :<PrivateRote> <Dashboard/></PrivateRote>
        },
      ]
    },

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
