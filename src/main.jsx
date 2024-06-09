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
        path: "/becomeATrainer",
        element: (
          <PrivateRoute>
            <BecomeATrainer></BecomeATrainer>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="container mx-auto">
    <React.StrictMode>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </React.StrictMode>
  </div>,
);
