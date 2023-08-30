import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantsContextProvider from "./context/restaurants-context";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/restaurants/:id", element: <RestaurantDetailPage /> },
  { path: "restaurants/:id/update", element: <UpdatePage /> },
]);

const App = () => {
  return (
    <RestaurantsContextProvider>
      <RouterProvider router={router} />
    </RestaurantsContextProvider>
  );
};

export default App;
