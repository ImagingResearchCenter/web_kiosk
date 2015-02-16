var AppWindow = React.createClass({
  render: function() {
    return (
      <div className="appWindow">
        <span>{this.props.children}</span>
      </div>
    );
  }
});

var MainView = React.createClass({
  render: function() {
    var apps = this.props.data.map(function(app) {
      return (
        <AppWindow href={app.url}>
          {app.name}
        </AppWindow>
      );
    });
    return (
      <div className="main">
        {apps}
      </div>
    );
  }
});
