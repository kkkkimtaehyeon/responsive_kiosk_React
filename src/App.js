import React from "react";
import MainLayout from "./layouts/index";
import Home from "./pages/Home";
import OlderOrder from "./pages/OlderOrder";
import YoungerOrder from "./pages/YoungerOrder";
import Purchase from "./pages/Purchase";
import UsingAI from "./pages/UsingAI";
import NotFoundPage from "./pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "olderorder",
          element: <OlderOrder />,
        },
        {
          path: "youngerorder",
          element: <YoungerOrder />,
        },
        {
          path: "usingai",
          element: <UsingAI />,
        },
        {
          path: "purchase",
          element: <Purchase />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
