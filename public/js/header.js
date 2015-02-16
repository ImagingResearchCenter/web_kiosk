var TIME_FORMAT = "HH:mm:ss";

// React Mixin to handle intervals.
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

// Branding text.
var Brand = React.createClass({
  render: function() {
    return (
      <h1 className="brand">
        <span className="black">I</span>
        <span className="blue">R</span>
        <span className="black">C</span>
      </h1>
    );
  }
});

// Clock widget
var Clock = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function() {
    return {time: moment().format(TIME_FORMAT)};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000);
  },
  tick: function() {
    this.setState({ time: moment().format(TIME_FORMAT)});
  },
  render: function() {
    return (
      <span className="clock">{this.state.time}</span>
    );
  }
});

// Weather widget. Pulls data from OpenWeatherMap.
var WeatherWidget = React.createClass({
  mixins: [SetIntervalMixin],
  getCurrentWeather: function() {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/find?q=Baltimore&units=imperial",
      datatype: 'json',
      success: function(data) {
        var weather = data.list[0];
        this.setState({
          temperature: weather.main.temp,
          status: weather.weather[0].main.toLowerCase(),
          sunrise: moment(weather.sys.sunrise).format(TIME_FORMAT),
          sunset: moment(weather.sys.sunset).format(TIME_FORMAT)
        });
        this.processStatus();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    this.getCurrentWeather();
    return { temperature: 70, status: "wi-day-sunny", sunrise: "06:00:00", sunset: "18:00:00" }
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 60000);
  },
  tick: function() {
    this.getCurrentWeather();
  },
  processStatus: function() {
    switch (this.state.status) {
      case "clouds":
        this.setState({ status: "cloudy"});
        break;
      default:
        break;
    }
  },
  render: function() {
    var hour = moment().hour();
    return (
      <div className="weather">
        <span>{this.state.temperature + '\u2109'}</span>
        <i className={"wi wi-day-" + this.state.status}></i>
      </div>
    );
  }
});

// Container widget for Header component.
var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <Brand />
        <Clock />
        <WeatherWidget url="http://api.openweathermap.org/data/2.5/find?q=Baltimore&units=imperial" />
      </div>
    );
  }
});
