import React from "react";
import "./App.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";
import useAuth from "./hooks/useAuth";

function App() {
  const history = useHistory();
  const auth = useAuth("token", false);
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="App-link">
          Home
        </Link>
        {auth.loggedIn() ? (
          <Link to="/logout" className="App-link">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="App-link">
            Login
          </Link>
        )}
      </header>
      <div className="container">
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route exact path="/login">
            <LoginForm
              onLogin={() => {
                console.log("Success!");
                history.push("/friends");
              }}
            />
          </Route>
          <Route exact path="/logout">
            {() => {
              auth.logout();
              history.push("/");
            }}
          </Route>
          <PrivateRoute auth={auth} exact path="/friends"></PrivateRoute>
        </Switch>
      </div>
    </div>
  );
}

export default App;
