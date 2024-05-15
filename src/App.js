import './App.css';

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./pages/Home";
import YoungerOrder from "./pages/YoungerOrder";
import UsingAI from "./pages/UsingAI";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts";
import Search from "./pages/AI_search/Search";
import SearchOrder from "./pages/AI_search/SearchOrder";
import SearchV2 from "./pages/AI_search/Search_ver2";

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
                    element: <SearchV2 />
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