import React from "react";
import useAuth, { useAuthType } from "../hooks/useAuth";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  auth: useAuthType;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ auth, children }: PrivateRouteProps, ...rest) => {
  return auth.loggedIn() ? <Route {...rest}>{children}</Route> : <Redirect to="/login" />;
};

export default PrivateRoute;
