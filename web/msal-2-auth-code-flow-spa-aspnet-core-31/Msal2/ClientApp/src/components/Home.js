import React, { Component } from 'react';
import auth from './auth';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchWeather() {
    auth.getToken().then(accessToken => {
      fetch("/weatherforecast", { headers: { Authorization: `Bearer ${accessToken}` } }).then(response => {
        response.json().then(result => {
          this.setState(result);
        })
      });
    });
  }

  render() {
    const weather = this.state && this.state[0] ? this.state[0] : undefined;
    return (
      <div>
        <h1>Tomorrow's weather forecast</h1>
        <br />
        <button onClick={() => this.fetchWeather()}>refresh</button>
        <br />
        {weather &&
          <div>
            <p>Temperature: {weather.temperatureC}</p>
            <p>Sumnmary: {weather.summary}</p>
          </div>
        }
      </div>
    );
  }
}
