import SideBar from "./SideBar";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const { token, user } = useSelector(state => state.auth);

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="dashboard-layout">
            <SideBar />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
};
export default Dashboard;
