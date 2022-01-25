import logo from './logo.svg';
import './App.css';
import Board from "./Board"

function App() {
  return (
    <div className="App">
   <span style={{fontWeight:"700",color:"#7a3f00"}} >SNAKE Board</span>
      <Board/>
    </div>
  );
}

export default App;
