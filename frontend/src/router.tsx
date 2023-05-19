import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chatpage from "./Pages/ChatPage";
import HomePage from "./Pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "chats",
        element: <Chatpage />,
      },
    ],
  },
]);
