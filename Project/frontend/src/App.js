import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Homepage from './Component/Homepage';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <div className="list-group w-300 vh-100">
            <Link to="/" className="list-group-item active">HomePage</Link>
          </div>
        </nav>
        <div className="ml-300 bg">
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>

      </Router>
    </div>
  );
}

export default App;
