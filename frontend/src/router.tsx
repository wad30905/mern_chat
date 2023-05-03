import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chats from "./Pages/Chats";
import HomePage from "./Pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "chats",
        element: <Chats />,
      },
    ],
  },
]);
