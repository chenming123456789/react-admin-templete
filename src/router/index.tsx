import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/pages/User";
import RoleManagement from "@/pages/Role";
import Profile from "@/pages/Profile";
import Test from "@/pages/Test";
import Registration from "@/pages/Medical/Registration";
import Billing from "@/pages/Medical/Billing";
import ChannelManagement from "@/pages/Medical/Channel";
import AccountManagement from "@/pages/Medical/AccountManagement";
import NotFound from "@/pages/NotFound";
import AuthGuard from "@/components/AuthGuard";


const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthGuard>
        <Login />
      </AuthGuard>
    )
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "users",
        element: <UserManagement />
      },
      {
        path: "roles",
        element: <RoleManagement />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "test",
        element: <Test />
      },
      {
        path: "medical/registration",
        element: <Registration />
      },
      {
        path: "medical/billing",
        element: <Billing />
      },
      {
        path: "medical/channel",
        element: <ChannelManagement />
      },
      {
        path: "medical/accountManagement",
        element: <AccountManagement />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
