import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import RankPage from './components/RankPage'

import Homepage from './components/Homepage';

import About from './components/About';


function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <div className="list-group w-300 vh-100">
            <Link to="/" className="list-group-item active">HomePage</Link>
            <Link to="/rank" className="list-group-item active">RankPage</Link>
            <Link to="/about" className="list-group-item active">AboutPage</Link>
          </div>
        </nav>
        <div className="ml-300 bg">
          <Switch>
            <Route path="/rank" component={RankPage}>
              <RankPage />
            </Route>
            <Route path="/about" component={About}>
              <About />
            </Route>
            <Route path="/" component={Homepage}>
              <Homepage />
            </Route>
          </Switch>
        </div>

      </Router>

    </div>
  );
}

export default App;
