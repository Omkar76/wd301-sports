import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Signup from "./Signup";
import Preferences from "./Preferences";
import Home from "./Home";
import ArticleModal from "./ArticleModal";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/preferences",
            element: <Preferences />,
          },
          {
            path: "/articles/:articleId",
            element: <ArticleModal/>
          }
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
