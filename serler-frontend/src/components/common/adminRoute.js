import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const AdminRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const currentUser = auth.getCurrentUser();
        if (!currentUser) return <Redirect to="/login" />;
        if (currentUser.role !== "Admin") return <Redirect to="/notAuthorized" />;
        console.log('expanded props: ', props);
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminRoute;
