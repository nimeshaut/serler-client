import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notfound";
import NavBar from "./components/navbar/navBar";
import LoginForm from "./components/login/loginForm";
import RegisterForm from "./components/register/registerForm";
import UserDashboard from "./components/user/userDashboard";
import Logout from "./components/login/logout";
import auth from "./services/authService";
import Users from "./components/admin/users/users";
import UserForm from "./components/admin/users/userForm";
import Roles from "./components/admin/roles/roles";
import RoleForm from "./components/admin/roles/roleForm";
import GenderForm from "./components/admin/genders/genderForm";
import Genders from "./components/admin/genders/genders";
import ProtectedRoute from "./components/common/protectedRoute";
import AdminRoute from "./components/common/adminRoute";
import UserRoute from './components/common/userRoute';
import AnalystRoute from './components/common/analystRoute';
import ModeratorRoute from './components/common/moderatorRoute';
import NotAuthorized from "./components/notAuthorized";
import Search from "./components/search/search";
import AdminDashboard from './components/admin/adminDashboard';
import ModeratorDashboard from './components/moderator/moderatorDashboard';
import AnalystDashboard from './components/analyst/analystDashboard';
import AddPaper from './components/paper/addpaper';
import AddManual from './components/paper/addmanual';
import AddBibtex from './components/paper/addbibtex';
import ResearchMethodsForm from "./components/admin/researchMethods/researchMethodsForm";
import ResearchMethods from "./components/admin/researchMethods/researchMethods";
import ParticipantForm from "./components/admin/participants/participantsForm";
import Participants from "./components/admin/participants/participants";
import TaskMethodologiesForm from "./components/admin/taskMethodologies/taskMethodologiesForm";
import TaskMethodologies from "./components/admin/taskMethodologies/taskMethodologies";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    
    return (
      
      <React.Fragment>
      
        <ToastContainer />
        <NavBar user={user} />
        <main className="container-fluid">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <AdminRoute path="/Admin/users/:id" component={UserForm}   />
            <AdminRoute path="/Admin/users" component={Users}  />
            <AdminRoute path="/Admin/roles/:id" component={RoleForm} />
            <AdminRoute path="/Admin/roles" component={Roles} />
            <AdminRoute path="/Admin/genders/:id" component={GenderForm} />
            <AdminRoute path="/Admin/genders" component={Genders} />

			<AdminRoute path="/Admin/taskMethodologies/:id" component={TaskMethodologiesForm} />
			<AdminRoute path="/Admin/taskMethodologies" component={TaskMethodologies} />
			
			<AdminRoute path="/Admin/participants/:id" component={ParticipantForm} />

			<AdminRoute path="/Admin/participants" component={Participants} />
			<AdminRoute path="/Admin/researchMethods/:id" component={ResearchMethodsForm} />
			<AdminRoute path="/Admin/researchMethods" component={ResearchMethods} />
            // <ProtectedRoute path="/search/:id" component={UserForm} />
            <ProtectedRoute path="/search" component={Search} />
            <Route path="/paper" component={AddPaper}></Route>
            <Route path="/addmanual" component={AddManual}></Route>
            <Route path="/addbibtex" component={AddBibtex}></Route>
            <UserRoute path="/User/dashboard" component={UserDashboard}></UserRoute>
            <AdminRoute path="/Admin/dashboard" component={AdminDashboard}></AdminRoute>
            <ModeratorRoute path="/Moderator/dashboard" component={ModeratorDashboard}></ModeratorRoute>
            <AnalystRoute path="/Analyst/dashboard" component={AnalystDashboard}></AnalystRoute>
            <Route path="/notAuthorized" component={NotAuthorized}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={Home}></Route>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
