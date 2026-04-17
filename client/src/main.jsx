import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "../Layout.jsx";
import Broadcast from "./pages/Broadcast.jsx";
import OneonOne from "./pages/OneonOne.jsx";
import GroupChat from "./pages/GroupChat.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/broadcast" element={<Broadcast />} />
        <Route path="/one-on-one" element={<OneonOne />}/>
        <Route path="/group-chat" element={<GroupChat />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
