// <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>
// from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
// <a href="http://creativecommons.org/licenses/by/3.0/"
// title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export class PomodoroTimer extends React.Component {
  constructor() {
    super();

    this.handleInputchange = this.handleInputchange.bind(this);

    this.state = {
      interval: 0.15,
      pause: 5,
      timerSet: false,
      time: 0,
      playSound: false
    };
    this.timerValues = [45, 35, 25, 15, "custom"];
    this.pauseValues = [5, 10, 15, 30, "custom"];

    const alert = () => {
      this.soundRef = React.createRef();
      if (this.state.playSound) {
        return <audio ref={this.soundRef} src="sounds/oldring.mp3" autoPlay />;
      }
    };
  }

  stopTimer() {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      timerSet: false,
      playSound: false
    });
  }

  startTimer() {
    const now = Date.now();
    const countDownTime = now + this.state.interval * 60 * 1000;

    this.setState({
      timerSet: true
    });

    this.timer = setInterval(() => {
      const rest = countDownTime - Date.now();
      this.setState({
        time: rest
      });

      if (rest <= 0) {
        clearInterval(this.timer);
        this.setState({
          playSound: true
        });
      }
    }, 1);
  }

  handleInputchange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name, value);
  }

  render() {
    let minutes = Math.floor(
      (this.state.time % (1000 * 60 * 60)) / (1000 * 60)
    );
    minutes = minutes < 10 ? "0".concat(minutes) : minutes;
    let seconds = Math.floor((this.state.time % (1000 * 60)) / 1000);
    seconds = seconds < 10 ? "0".concat(seconds) : seconds;

    let intervalOptions = this.timerValues.map(o => {
      return (
        <option key={o} value={o}>
          {o}
        </option>
      );
    });
    let pauseOptions = this.pauseValues.map(o => {
      return (
        <option key={o} value={o}>
          {o}
        </option>
      );
    });
    let btnText = this.state.timerSet ? "stop" : "start";
    return (
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Navbar.Brand>
          {" "}
          <img
            alt=""
            src="tomato.png"
            width="24"
            height="24"
            className="d-inline-block align-top"
          />
          {" timer"}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Form>
            <Form.Row>
              <Col>
                <Form.Label>pomodori</Form.Label>
                <Form.Control
                  as="select"
                  name="interval"
                  onChange={this.handleInputchange}
                >
                  {intervalOptions}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>break</Form.Label>
                <Form.Control
                  as="select"
                  name="pause"
                  onChange={this.handleInputchange}
                >
                  {pauseOptions}
                </Form.Control>
              </Col>
            </Form.Row>
          </Form>
        </Nav>
        <Nav className="mr-auto">
          <Badge pill variant="secondary">
            <h1>
              {" "}
              {minutes}:{seconds}{" "}
            </h1>
          </Badge>
        </Nav>
        <Nav className="mr-auto">
          <Button
            size="lg"
            variant="warning"
            onClick={
              this.state.timerSet
                ? () => this.stopTimer()
                : () => this.startTimer()
            }
          >
            {btnText}
          </Button>
        </Nav>
      </Navbar>
    );
  }
}

export default PomodoroTimer;
