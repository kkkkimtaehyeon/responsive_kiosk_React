import './App.css';

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SearchOrder from "./pages/AI_search/SearchOrder";
import Purchase from "./pages/Purchase";
import Payment from "./pages/AI_search/Payment";
import OrderComplete from "./pages/AI_search/OrderComplete";
import AudioStreaming from "./pages/test/AudioStreaming";
import WebcamCapture from "./functions/WebcamCapture";
import Index from "./pages/Index";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Index />
        },
        {
            path: "main",
            element: <WebcamCapture />
        },
        {
            path: "ai-order",
            element: <AudioStreaming />,
        },
        {
            path: "search-order",
            element: <SearchOrder />
        },
        {
            path: "payment",
            element: <Payment />,
        },
        {
            path: "purchase",
            element: <Purchase />,
        },
        {
            path: "order-complete",
            element: <OrderComplete />,
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