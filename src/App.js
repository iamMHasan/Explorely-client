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
import AddorEditTour from './pages/AddorEditTour';
import AddEdit from './pages/AddEdit';

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
      children: [
        {
          path: "/",
          element: <Home />,
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
          element : <AddEdit/>
        },
        {
          path : "/editTour/:id",
          element : <AddEdit/>
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
