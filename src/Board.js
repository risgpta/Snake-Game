import React,{useState,useEffect,useRef} from "react"
import './App.css';

export default function Board() {
    const SIZE = 44;
    const board = Array(SIZE).fill(Array(SIZE).fill(0));

    const prevMoveRef = useRef();

    const getRandomCell = () => {
    return Math.floor(Math.random()*SIZE*SIZE);
    }

    const getSnakeArr = () => {
        const first = getRandomCell();
        const second = first-1;
        return [first,second];
    }

    const [snake,setSnake] = useState(getSnakeArr())
    const [food,setFood] = useState(getRandomCell())
    const [move,setMove] = useState("d");
    const [speed,setSpeed] = useState(10);
    const [score,setScore] = useState(0);
    const [game,setGame] = useState(true);

    const handleKeypress = (e) => {
            console.log(game);
            if(game === false)
            {
                console.log("end..")
                return;
            }
            if(e.key === "d"){
                if(prevMoveRef.current === "a")
                return;
                setSnake(s => {
                const temp = [...s];
                let j = ((temp[0])%SIZE+1)%SIZE;
                let i = parseInt((temp[0])/SIZE);
                const newSnake = [i*SIZE+j,...temp.slice(0,temp.length-1)];
                let checkIntersectSet = new Set(newSnake);
                if(checkIntersectSet.size !== newSnake.length)
                {
                    console.log(checkIntersectSet,snake)
                    setGame(false);
                    return temp;
                }
                return newSnake;
            });
            setMove("d");
            prevMoveRef.current = e.key;
            }
            if(e.key === "a"){
                if(prevMoveRef.current === "d")
                return;
            setSnake(s => {
                const temp = [...s];
                let j = ((temp[0])%SIZE-1+SIZE)%SIZE;
                let i = parseInt((temp[0])/SIZE);
                const newSnake = [i*SIZE+j,...temp.slice(0,temp.length-1)];
                let checkIntersectSet = new Set(newSnake);
                if(checkIntersectSet.size !== newSnake.length)
                {
                    console.log(checkIntersectSet,snake)
                    setGame(false);
                    return temp;
                }
                return newSnake;
            });
            setMove("a");
            prevMoveRef.current = e.key;
            }
            if(e.key === "w"){
                if(prevMoveRef.current === "s")
                return;
            setSnake(s => {
                const temp = [...s];
                let j = (temp[0])%SIZE;
                let i = (parseInt((temp[0])/SIZE) - 1 +SIZE)%SIZE;
                const newSnake = [i*SIZE+j,...temp.slice(0,temp.length-1)];
                let checkIntersectSet = new Set(newSnake);
                if(checkIntersectSet.size !== newSnake.length)
                {
                    console.log(checkIntersectSet,snake)
                    setGame(false);
                    return temp;
                }
                return newSnake;
            });
            setMove("w");
            prevMoveRef.current = e.key;
            }
            if(e.key === "s"){
                if(prevMoveRef.current === "w")
                return;
            setSnake(s => {
                const temp = [...s];
                let j = (temp[0])%SIZE;
                let i = (parseInt((temp[0])/SIZE) + 1)%SIZE;
                const newSnake = [i*SIZE+j,...temp.slice(0,temp.length-1)];
                let checkIntersectSet = new Set(newSnake);
                if(checkIntersectSet.size !== newSnake.length)
                {
                    console.log(checkIntersectSet,snake)
                    setGame(false);
                    return temp;
                }
                return newSnake;
            });
            setMove("s");
            prevMoveRef.current = e.key;
            }
    }
    useEffect(() => {
        window.addEventListener('keypress',handleKeypress);
        return () => {
            window.removeEventListener('keypress',handleKeypress)
        }
    },[game]);

    useEffect(() => {
        let t = setInterval(() => {
            let eve = {key:move}
            if(game)
            handleKeypress(eve);
        }, 1000/speed);
        return () => clearInterval(t);
    },[move,speed,game]);

    useEffect(() => {
        if(snake[0] === food){
            setScore(s => s+10);
            if(move === "a"){
            setSnake(s => {
                const temp = [...s];
                let j = ((temp[temp.length-1])%SIZE+1)%SIZE;
                let i = parseInt((temp[temp.length-1])/SIZE);
                temp.push(i*SIZE+j);
                return temp;
            });
            }
            if(move === "d"){
            setSnake(s => {
                const temp = [...s];
                let j = ((temp[temp.length-1])%SIZE-1+SIZE)%SIZE;
                let i = parseInt((temp[temp.length-1])/SIZE);
                temp.push(i*SIZE+j);
                return temp;
            });
            }
            if(move === "s"){
            setSnake(s => {
                const temp = [...s];
                let j = (temp[temp.length-1])%SIZE;
                let i = (parseInt((temp[temp.length-1])/SIZE) - 1 +SIZE)%SIZE;
                temp.push(i*SIZE+j);
                return temp;
            });
            }
            if(move === "w"){
            setSnake(s => {
                const temp = [...s];
                let j = (temp[temp.length-1])%SIZE;
                let i = (parseInt((temp[temp.length-1])/SIZE) + 1)%SIZE;
                temp.push(i*SIZE+j);
                return temp;
            });
            }
            setFood(getRandomCell());
        }
    },[snake]);

  return <div>
  <span style={{fontWeight:"700",color:"#f30630"}} >{game ? `${score}💰` : `GAME OVER!!! score:${score}💰`}</span>
  {
      board.map((row,index) => <div key={index} className="board">
      {
          row.map((cell,index2) => <div  key={index2} className={snake.indexOf(index*SIZE+index2) >= 0 ? index*SIZE+index2 === snake[0] ? "board-cell-head" : "board-cell-with-snake" : index*SIZE+index2 === food ? "board-cell-food" : "board-cell"}>{index*SIZE+index2 === food ? "🐀" : index*SIZE+index2 === snake[0] ? <span className="head"></span>: ""}</div>)
      }</div>)
  }
  <span style={{fontWeight:"700",color:"#5400f3"}} >SPEED</span>:<span style={{fontWeight:"bold",color:"red"}} >{speed}</span>
  <input style={{outline:"none"}} type="range" value={speed} onChange={(e) => setSpeed(e.target.value)} min="1" max="25"/>
  </div>;
}
