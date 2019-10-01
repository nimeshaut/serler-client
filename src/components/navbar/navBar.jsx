import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src="/SerlerLogo.png" alt="" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <NavLink className="nav-link" to="/">
          Home <span className="sr-only">(current)</span>
        </NavLink>

        <NavLink className="nav-link" to="/search">
          Search
        </NavLink>
        {user && user.role === "Analyzer" && (
          <React.Fragment>
            <NavLink className="nav-link" to="/analyst/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/analyst/queue">
              Analyzer Queue
            </NavLink>
          </React.Fragment>
        )}
        {user && user.role === "Moderator" && (
          <React.Fragment>
            <NavLink className="nav-link" to="/moderator/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/moderator/queue">
              Moderator Queue
            </NavLink>
          </React.Fragment>
        )}
        {user && user.role === "Admin" && (
          <React.Fragment>
            <NavLink className="nav-link" to="/admin/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/admin/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/admin/roles">
              Roles
            </NavLink>
            <NavLink className="nav-link" to="/admin/genders">
              Genders
            </NavLink>
          </React.Fragment>
        )}
        {user && user.role === "User" && (
          <React.Fragment>
            <NavLink className="nav-link" to="/user/dashboard">
              Dashboard
            </NavLink>
            
          </React.Fragment>
        )}

        {!user && (
          <React.Fragment>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        )}

        {user && (
          <React.Fragment>
            
            <NavLink className="nav-link" to="/me">
              {user.name}
            </NavLink>
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
