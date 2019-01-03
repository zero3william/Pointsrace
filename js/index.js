window.onload = function() {
  let players = [];
  let rounds = [];

  for (let i = 0; i < 24; i++) {
    let str = `player${i + 1}`;
    let point = getRandomInt(4, 24);
    players.push({ name: str, point: point });
  }

  var data = players;

  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

  // set the ranges
  var y = d3
    .scaleBand()
    .range([height, 0])
    .padding(0.1);
  var x = d3.scaleLinear().range([0, width]);

  // append the svg object to the element
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // format the data
  data.forEach(function(d) {
    d.point = +d.point;
  });

  // Scale the range of the data in the domains
  x.domain([
    0,
    d3.max(data, function(d) {
      return d.point;
    })
  ]);
  y.domain(
    data.map(function(d) {
      return d.name;
    })
  );

  // append the rectangles for the bar chart
  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('width', function(d) {
      return x(d.point);
    })
    .attr('y', function(d) {
      return y(d.name);
    })
    .attr('height', y.bandwidth());

  // add the x Axis
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  // // add the y Axis
  svg.append('g').call(d3.axisLeft(y));

  // // add the name
  svg
    .selectAll('.text')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'text')
    .attr('x', function(d) {
      return x(d.point);
    })
    .attr('y', function(d) {
      return y(d.name) + 18;
    })
    .text(function(d) {
      return d.name;
    });
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
