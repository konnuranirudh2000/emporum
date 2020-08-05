import React from "react";
import firebase from "firebase/app";

class AddItem extends React.Component {
  constructor() {
    super();
    this.state = {
      UPC: false,
      Name: "",
      Description: "",
      UPCCode: "",
      Category: ""
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleOnSubmit = () => {
    const username = firebase.auth().currentUser.uid;
    const itemsRef = firebase.database().ref(`/Users/${username}/items`);
    console.log(this.state);
    const item = {
      Name: this.state.Name,
      Description: this.state.Description,
      UPCCode: this.state.UPCCode,
      Category: this.state.Category
    };
    // // UPC code
    // if (this.state.UPC) {
    //   itemsRef.push(item);
    // }
    // // non UPC
    // else if (!this.state.UPC) {
    //   itemsRef.push(item);
    // }
    if (this.state.Category === "") {
      alert("please choose a category");
      return;
    }
    itemsRef.child(item.Name).set(item);
    console.log("reached end of handle submit");
    console.log(item.Name);
  };
  handleInputChange = e => {
    console.log("changing state");
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.Category);
  };

  /* <div>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            name="Name"
            placeholder="Enter Name"
            onChange={this.handleInputChange}
          ></input>
          <input
            type="text"
            name="Description"
            paceholder="Enter Description"
            onChange={this.handleInputChange}
          ></input>
          <select onChange={this.handleInputChange} name="Category">
            <option value="No Category" disabled selected>
              Select a category
            </option>
            <option value="Art">Art</option>
            <option value="Car">Car</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Sports and Outdoors">Sports And Outdoors</option>
            <option value="Tools">Tools</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div> */

  renderNoUPC = () => {
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
            <form class="form-inline" onSubmit={this.handleOnSubmit}>
              <div class="form-group">
                <label for="email">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="Name"
                  placeholder="Enter Name"
                  name="Name"
                  onChange={this.handleInputChange}
                />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Enter Description"
                  name="Description"
                  onChange={this.handleInputChange}
                />
              </div>
              <select onChange={this.handleInputChange} name="Category">
                <option value="No Category" disabled selected>
                  Select a category
                </option>
                <option value="Art">Art</option>
                <option value="Car">Car</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Sports and Outdoors">Sports And Outdoors</option>
                <option value="Tools">Tools</option>
                <option value="Other">Other</option>
              </select>
              <button type="submit" class="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        </body>
      </div>
    );
  };

  //   renderUPC = () => {
  //     return (
  //       <div>
  //         <form onSubmit={this.handleOnSubmit}>
  //           <input type="text" name="UPCCode" />
  //         </form>
  //       </div>
  //     );
  //   };
  render = () => {
    return (
      <div>
        <ul>{this.renderNoUPC()}</ul>
      </div>
    );
  };
}
export default AddItem;
