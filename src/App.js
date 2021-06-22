import React, { Component } from "react";
import Header from "./components/Header/Header";
import Grocery from "./components/Grocery/Grocery"


export class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Grocery/>
        
      </div>
    );
  }
}
export default App;