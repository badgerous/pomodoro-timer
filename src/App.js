import React, { Component } from "react";
import { PomodoroTimer } from "./components/PomodoroTimer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PomodoroTimer />
      </div>
    );
  }
}

export default App;
