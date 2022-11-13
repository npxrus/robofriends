import React from 'react';

import CardList from './CardList';
import SearchBox from './SearchBox';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://fakerapi.it/api/v1/persons?_quantity=20')
      .then((res) => res.json())
      .then((users) => this.setState({ robots: users.data }));
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const filteredRobots = this.state.robots.filter((robot) =>
      robot.firstname
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase())
    );

    if (!this.state.robots.length) {
      return <h1 className='tc'>Loading...</h1>;
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <CardList robots={filteredRobots} />
        </div>
      );
    }
  }
}

export default App;
