import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import DogDetail from './components/DogDetail/DogDetail'
import createDog  from './components/DogsCreated/DogsCreated';


function App() {
  return (
    <div className='App'>
      <Switch>
        <BrowserRouter>
          <React.Fragment>
              <Route path="/home" component={NavBar}/>
              <Route exact path ="/" component = {LandingPage}/> 
              <Route exact path="/home" component={Home} />
              <Route exact path="/home/DogDetail/:id" component={DogDetail} />
              <Route exact path="/home/create" component={createDog} />
          </React.Fragment>
        </BrowserRouter>
      </Switch>
    </div>
  );
}

export default App;
