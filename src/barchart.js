import * as d3 from 'd3';

function init(el, data) {
  const containerWidth = parseInt(d3.select(el).style("width"), 10);
  const containerHeight = parseInt(d3.select(el).style("height"), 10);

  console.log(d3.select(el).attr("height"));

  const svg = d3.select(el).append('svg').attr('width', containerWidth).attr('height', containerHeight);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function (d) { return d.letter; }));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

  const bar = g.selectAll(".bar")
    .data(data);

  bar.enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return x(d.letter); })
    .attr("y", function (d) { return y(d.frequency); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d.frequency); });
}

function update(el, data) {
  const containerWidth = parseInt(d3.select(el).style("width"), 10);
  const containerHeight = parseInt(d3.select(el).style("height"), 10);

  const svg = d3.select(el).select('svg').attr('width', containerWidth).attr('height', containerHeight);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  x.domain(data.map(function (d) { return d.letter; }));
  y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

  d3.selectAll('g.axis.axis--x')
    .call(d3.axisBottom(x));

  const g = svg.select("g")

  const bar = g.selectAll(".bar")
    .data(data);

  bar.attr("width", x.bandwidth())
    .attr("x", function (d) { return x(d.letter); })
    .transition()
    .duration(750)
    .attr("y", function (d) { return y(d.frequency); })
    .attr("height", function (d) { return height - y(d.frequency); });
}

class Chart extends Component {
  componentDidMount() {
    init(this.refs.chart, this.props.data);
  }

  componentDidUpdate() {
    update(this.refs.chart, this.props.data);
  }

  render() {
    return (
      <div ref="chart" className="Chart">
      </div>
    )
  }
}

export default Chart;