import { useEffect, useState } from 'react';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';

import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    fetch('https://fakerapi.it/api/v1/persons?_quantity=20')
      .then((res) => res.json())
      .then((users) => setRobots([...users.data]));
  }, []);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredRobots = robots.filter((robot) =>
    robot.firstname.toLowerCase().includes(searchField.toLowerCase())
  );

  if (!robots.length) {
    return <h1 className='tc'>Loading...</h1>;
  } else {
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
};

export default App;
