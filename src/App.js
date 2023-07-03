import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register, { action as registerAction } from "./pages/Register";
import Login, { action as loginAction } from "./pages/Login";
import Error from "./pages/Error";
import Tasks from "./pages/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction,
  },
  { path: "/register", element: <Register />, action: registerAction },
  { path: "/tasks", element: <Tasks /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
