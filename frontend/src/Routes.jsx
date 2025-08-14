import React, { useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from "react-router-dom"; // fixed import

// Pages List
import DashBoard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Context
import { useAuth } from "../authContext";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if (!userIdFromStorage && !["/auth", "/signup"].includes(location.pathname)) {
            navigate("/auth");
        }

        if (userIdFromStorage && location.pathname === "/auth") {
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser, location.pathname]);

    const element = useRoutes([
        { path: "/", element: <DashBoard /> },
        { path: "/auth", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/profile", element: <Profile /> },
    ]);

    return element;
};

export default ProjectRoutes;
