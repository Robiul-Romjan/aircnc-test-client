import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddRoom from "../pages/Dashboard/AddRoom/AddRoom";
import { getRoom } from "../api/rooms";
import MyBookings from "../pages/Dashboard/Mybookings/MyBookings";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/room/:id",
                element: <PrivateRoute><RoomDetails /></PrivateRoute>,
                loader: ({params})=> getRoom(params.id)
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signUp",
                element: <SignUp />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "add-room",
                element: <AddRoom />
            },
            {
                path: "my-bookings",
                element: <MyBookings />
            }
        ]
    }
]);

export default router;