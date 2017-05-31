import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
import './App.css';
import Chart from './Chart';
import LineChart from './LineChart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [{ letter: 'A', frequency: 1 }, { letter: 'B', frequency: 2 }, { letter: 'C', frequency: 2 }] };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    this.setState({
      data: [
        { letter: 'A', frequency: (Math.random() * 10 | 0) / 10 },
        { letter: 'B', frequency: (Math.random() * 10 | 0) / 10 },
        { letter: 'C', frequency: (Math.random() * 10 | 0) / 10 },
      ]
    });
    setTimeout(this.updateData, 950);
  }

  render() {
    const layout = [
      { i: 'a', x: 0, y: 0, w: 3, h: 2 },
      { i: 'b', x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 6 },
      { i: 'c', x: 0, y: 2, w: 6, h: 2, minW: 2, maxW: 6 },
    ];

    return (
      <div className="App">
        <div className="App-header">
          <h2>Reusable Charts</h2>
        </div>
        <div className="dashboard">
          <ReactGridLayout className="layout" layout={layout} cols={6} rowHeight={140} width={800}>
            <div className="chart-container" key={'a'}>
              <LineChart className="line-container" data={this.state} onSelected={(letter) => this.setState({ selected: letter })} />
            </div>
            <div className="chart-container" key={'b'}>
              <Chart className="bar-container" data={this.state} onSelected={(letter) => this.setState({ selected: letter })} />
            </div>
            <div className="chart-container" key={'c'}>
              <Chart className="bar-container" data={this.state} onSelected={(letter) => this.setState({ selected: letter })} />
            </div>
          </ReactGridLayout>
        </div>
      </div>
    );
  }
}

export default App;
