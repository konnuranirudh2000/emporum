import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../../config/firebaseConfig";
import { AuthContext } from "../Auth";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <head>
        <title>Bootstrap Example</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </head>
      <body>
        <div class="container">
          <h2>LogIn</h2>
          <form onSubmit={handleLogin}>
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
              />
            </div>
            <div class="form-group">
              <label for="pwd">Password:</label>
              <input
                type="password"
                class="form-control"
                id="pwd"
                placeholder="Enter
              password"
                name="password"
              />
            </div>
            <button type="submit" class="btn btn-default">
              Submit
            </button>
          </form>
          <br></br>
          <a href="SignUp">SignUp</a>
        </div>
      </body>
    </div>
  );
};

export default withRouter(Login);
