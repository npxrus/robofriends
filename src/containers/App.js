import { useEffect } from 'react';
import { connect } from 'react-redux';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField, requestRobots } from '../actions';

import './App.css';

const mapStateToProps = (state) => ({
  searchField: state.searchRobots.searchField,
  isPending: state.searchRobots.isPending,
  robots: state.requestRobots.robots,
  error: state.requestRobots.error,
});

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots()),
});

const App = (props) => {
  useEffect(() => {
    props.onRequestRobots();
  }, []);

  const filteredRobots = props.robots.filter((robot) =>
    robot.firstname.toLowerCase().includes(props.searchField.toLowerCase())
  );

  if (props.isPending) {
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
