import './App.css';

import Map from './map'
import Users from './Users'

function App() {
  //Width and height of map
var width = 960;
var height = 500;

  return (
    <div className="App">
      <header className="App-header">
        States We Have Visited
      </header>
      <div className="App-main">
        <Map/>
        <Users/>
      </div>
      <footer>
        WIP by Gary Varner
      </footer>
    </div>
  );
}

export default App;
