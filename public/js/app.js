var data = [
  {"name": "Site 1", "url": "/site1"},
  {"name": "Site 2", "url": "/site2"},
  {"name": "Site 3", "url": "/site3"},
  {"name": "Site 4", "url": "/site4"},
  {"name": "Site 5", "url": "/site5"},
  {"name": "Site 6", "url": "/site6"}
];

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <Header />
        <MainView data={data} />
      </div>
    );
  }
});
