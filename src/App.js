import './App.css';

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./pages/Home";
import YoungerOrder from "./pages/YoungerOrder";
import UsingAI from "./pages/UsingAI";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts";
import Search from "./pages/AI_search/Search";
import SearchOrder from "./pages/AI_search/SearchOrder";

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
                    path: "search",
                    element: <Search />
                },
                {
                    path: "search-order",
                    element: <SearchOrder />
                },
                // {
                //     path: "olderorder",
                //     element: <OlderOrder />,
                // },
                {
                    path: "youngerorder",
                    element: <YoungerOrder />,
                },
                {
                    path: "usingai",
                    element: <UsingAI />,
                },
                // {
                //     path: "purchase",
                //     element: <Purchase />,
                // },
            ],
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;