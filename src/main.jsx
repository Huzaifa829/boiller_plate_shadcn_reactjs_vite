import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./screens/Home/HomePage.jsx";

import { store } from "./config/redux/stores/store.js";
import { Provider } from "react-redux";

// Route Configuration
const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Main layout for all pages
    children: [
      {
        path: "", // Default route (HomePage)
        element: <HomePage />,
      },

   
    ],
  },
]);

// Render the Router
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
);
