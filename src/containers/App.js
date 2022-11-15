import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField } from '../actions';

import './App.css';

const mapStateToProps = (state) => ({
  searchField: state.searchField,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
});

const App = (props) => {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    fetch('https://fakerapi.it/api/v1/persons?_quantity=20')
      .then((res) => res.json())
      .then((users) => setRobots([...users.data]));
  }, []);

  const filteredRobots = robots.filter((robot) =>
    robot.firstname.toLowerCase().includes(props.searchField.toLowerCase())
  );

  if (!robots.length) {
    return <h1 className='tc'>Loading...</h1>;
  } else {
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={props.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
