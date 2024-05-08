import './App.css';
import WebcamCapture from "./functions/WebcamCapture";
import SpeechToText from "./functions/SpeechToText";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import YoungerOrder from "./pages/YoungerOrder";
import OlderOrder from "./pages/OlderOrder";
import UsingAI from "./pages/UsingAI";
import Purchase from "./pages/Purchase";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts";
import SearchComponent from "./pages/AI_search/SearchComponent";
import OrderComponent from "./pages/AI_search/OrderComponent";
import MiddleOrder from "./pages/AI_search/MiddleOrder";

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
                    element: <SearchComponent />
                },
                {
                    path: "search-order",
                    element: <OrderComponent />
                },
                {
                    path: "middle-order",
                    element: <MiddleOrder />
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