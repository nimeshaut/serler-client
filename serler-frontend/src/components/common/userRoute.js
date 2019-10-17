import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const UserRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const currentUser = auth.getCurrentUser();
        if (!currentUser) return <Redirect to="/login" />;
        if (currentUser.role !== "User") return <Redirect to="/notAuthorized" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default UserRoute;