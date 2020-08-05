import React from "react";
import firebase from "firebase";
import User from "./user";
import Navbar from "./Navbar";

class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref(`/Users/`);
    itemsRef.on("value", snapshot => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          name: users[user].name,
          uid: users[user].uid,
          email: users[user].email
        });
      }
      this.setState({
        users: newState
      });
    });
  }

  render = () => {
    const liStyle = {
      "list-style-type": "none"
    };
    return (
      <div>
        <Navbar />
        <form>
          <input type="text" name="text"></input>
          <button type="submit">Search</button>
        </form>
        <ul style={liStyle}>
          {this.state.users.map(item => {
            if (!item.email) {
            } else {
              return (
                <li key={item.uid}>
                  <User name={item.name} uid={item.uid} email={item.email} />
                  <br></br>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  };
}

export default Follow;
