import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField, requestRobots } from '../actions.js';

function App() {
    const dispatch = useDispatch();
    const { searchField } = useSelector((state) => state.searchRobots);
    const { robots, isPending, error } = useSelector(state => state.requestRobots);
    const onSearchChange = (event) => {
        dispatch(setSearchField(event.target.value));
      };
    const onRequestRobots = () => {
        dispatch(requestRobots())
     }

    useEffect(() => {
        onRequestRobots()
    },[])

    const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    
    if (isPending) {  
        return <h1 className="f1 tc">LOADING</h1>
    } 
    if (error) {
        return <h1 className="f1 tc">OOPS, THERE WAS AN ERROR. PLEASE TRY AGAIN.</h1>    
    } else {
        return (
            <div className='tc'>
                <h1 className="f1">ROBO FRIENDS</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}

export default App;
