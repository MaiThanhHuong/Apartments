import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userRole, requiredRole, children }: { userRole: string, requiredRole: string | null, children: JSX.Element }) => {
  const userRoleLower = userRole.toLowerCase();
  if (requiredRole && userRoleLower !== requiredRole.toLowerCase()) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default ProtectedRoute;