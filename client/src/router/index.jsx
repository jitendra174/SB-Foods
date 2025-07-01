import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import CategoryMenu from "../pages/CategoryMenu";
import AdminPanel from "../pages/AdminPanel";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/category/:name", element: <CategoryMenu /> },
      { path: "/admin", element: <AdminPanel /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
