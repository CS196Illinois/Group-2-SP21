import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import RankPage from './components/RankPage'

import Homepage from './components/Homepage';

import About from './components/About';
import BarGraph from './components/BarGraph';


function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <div className="list-group w-300 vh-100">
            <Link to="/" className="list-group-item active">HomePage</Link>
            <Link to="/rank" className="list-group-item active">RankPage</Link>
            <Link to="/about" className="list-group-item active">AboutPage</Link>
            <Link to="/bargraph" className="list-group-item active">BarGraph</Link>
          </div>
        </nav>
        <div className="ml-300 bg">

          <Switch>
            <Route path="/bargraph" render={() => <BarGraph/>} />
            <Route path="/rank" render={() => <RankPage/>} />
            <Route path="/about" render={() => <About/>} />
            <Route path="/" render={() => <Homepage/>} />

          </Switch>
          
        </div>

      </Router>

    </div>
  );
}

export default App;
