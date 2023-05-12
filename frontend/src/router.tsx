import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chats from "./Pages/Chats";
import HomePage from "./Pages/HomePage";
import LogIn from "./Pages/login";
import SignUp from "./Pages/signup";
import People from "./Pages/People";
import SingleChat from "./Pages/SingleChat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "people",
            element: <People />,
          },
          {
            path: "chats",
            element: <Chats />,
            children: [
              {
                path: ":chatId",
                element: <SingleChat />,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
