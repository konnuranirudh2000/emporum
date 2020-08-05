import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./components/profile";
import Login from "./components/forms/login";
import Signup from "./components/forms/signup";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Follow from "./components/follow";
import Suggestions from "./components/suggestions";
import Message from "./components/message/message";

const admin = require("firebase-admin");
const functions = require("firebase-functions");
// eslint-disable-next-line
const fv = admin.firestore.FieldValue;

admin.initializeApp(
  {
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://emporum-f33c4.firebaseio.com"
  },
  functions.config().firebase
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/follow" component={Follow} />
          <Route exact path="/suggestions" component={Suggestions} />
          <Route exact path="/messages" component={Message} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
