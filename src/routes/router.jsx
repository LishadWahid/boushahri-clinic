import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import DentalServices from "../pages/Home/Home/DentalServices";
import ServiceDetails from "../pages/Home/Home/ServiceDetails";
import ConsultationForm from "../pages/Home/Home/ConsultationForm";
import Coverage from "../pages/Home/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import MasterControl from "../pages/Dashboard/MasterControl";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import DatabaseManager from "../pages/Dashboard/DatabaseManager";
import AllIncome from "../pages/Dashboard/AllIncome";
import AddExpenses from "../pages/Dashboard/AddExpenses";
import AllAppointment from "../pages/Dashboard/AllAppointment";
import MyAppoinment from "../pages/Dashboard/MyAppoinment";
import PrivateRoute from "./PrivateRoute";
import MyReports from "../pages/Dashboard/MyReports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'services',
        Component: DentalServices,
      },
      {
        path: 'services/:id',
        Component: ServiceDetails,
      },
      {
        path: 'consultation',
        Component: ConsultationForm,
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenter.json').then(res => res.json()),
      }
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  // Dashboard
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: 'master-control',
        Component: MasterControl
      },
      {
        path: 'manage-users',
        Component: ManageUsers
      },
      {
        path: 'database-manager',
        Component: DatabaseManager
      },
      {
        path: 'all-income',
        Component: AllIncome
      },
      {
        path: 'add-expenses',
        Component: AddExpenses
      },
      {
        path: 'all-appointment',
        Component: AllAppointment
      },
      {
        path: 'my-appointments',
        Component: MyAppoinment
      },
      {
        path: 'my-reports',
        Component: MyReports
      }
    ]
  }
]);