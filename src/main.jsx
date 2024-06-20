import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./ErrorPage.jsx";
import Root from "./Root.jsx";
import Home from "./Home/Home.jsx";
import Login from "./Login.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./AuthProvider.jsx";
import Register from "./Register.jsx";
import AllTrainer from "./AllTrainer/AllTrainer.jsx";
import BecomeATrainer from "./AllTrainer/BecomeATrainer.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllUsers from "./Dashboard/AllUsers.jsx";
import UserProfile from "./UserProfile/UserProfile.jsx";
import AppliedTrainer from "./Dashboard/AppliedTrainer.jsx";
import AllTrainers from "./Dashboard/AllTrainers.jsx";
import AddNewClass from "./Dashboard/AddNewClass.jsx";
import AllClasses from "./AllClasses/AllClasses.jsx";
import AppliedTrainerDetails from "./Dashboard/AppliedTrainerDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allTrainer",
        element: <AllTrainer></AllTrainer>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/becomeATrainer",
        element: (
          <PrivateRoute>
            <BecomeATrainer></BecomeATrainer>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "home",
            element: <Home></Home>,
          },
          {
            path: "login",
            element: <Login></Login>,
          },
          {
            path: "allUsers",
            element: <AllUsers></AllUsers>,
          },
          {
            path: "appliedTrainer",
            element: <AppliedTrainer></AppliedTrainer>,
          },
          {
            path: "appliedTrainer/appliedTrainerDetails/:id",
            loader: ({ params }) =>
              fetch(
                `${import.meta.env.VITE_SERVER}/appliedTrainerDetail/${params.id}`,
              ),
            element: <AppliedTrainerDetails></AppliedTrainerDetails>,
          },
          {
            path: "allTrainers",
            element: <AllTrainers></AllTrainers>,
          },
          {
            path: "addNewClass",
            element: <AddNewClass></AddNewClass>,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="container mx-auto">
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  </div>,
);
