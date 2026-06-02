import { Navigate } from "react-router-dom";
import { useAuth } from "../context/loginContext";

const ProtectedRoute = ({ children}) => {
    const { isLogged } = useAuth();

    if (!isLogged) {
        return <Navigate to='/' replace />
    }

    return children;
}

export default ProtectedRoute;