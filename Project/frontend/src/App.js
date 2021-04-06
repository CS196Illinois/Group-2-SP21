import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import RankPage from './components/RankPage'

import Homepage from './Component/Homepage';


function App() {
  return (
    <div className="App">

      <Router>
        <nav>
          <div className="list-group w-300 vh-100">
            <Link to="/" className="list-group-item active">HomePage</Link>
            <Link to="/rank" className="list-group-item active">RankPage</Link>
          </div>
        </nav>
        <div className="ml-300 bg">
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
            <Route path="/rank">
              <RankPage />
            </Route>
          </Switch>
        </div>

      </Router>

    </div>
  );
}

export default App;
