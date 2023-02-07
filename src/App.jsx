import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./images/', false, /\.(png|jpe?g|svg)$/));

function App() {

  const [pointA, setPointA] = useState(null)
  const [pointB, setPointB] = useState(null)
  const [imageIndex, setImage] = useState(0)

  const setPoints = (e) => {
    const x = parseInt(e.clientX + window.scrollX);
    const y = parseInt(e.clientY + window.scrollY);
    if(pointA === null){
      setPointA({x,y});
    }else{
      setPointB({x,y});
    }
    if(pointB !== null){
      setPointB(null);
      setPointA({x,y});
    }
  }

  console.log(images)
  return (
    <div className="App">
      <div className="data">{`[${pointA?.y}:${pointB?.y}, ${pointA?.x}:${pointB?.x}]`}<select onChange={(e) => setImage(parseInt(e.target.value) - 1)}>
        {images.map((image, index) => {
          return <option value={index+1}>{index + 1}</option>
        })}
        </select></div>
      <img onClick={(e) => setPoints(e)} src={images[imageIndex]} alt="" />
      <div style={{left:pointA?.x, top:pointA?.y}} id="pointX"></div>
      <div style={{left:pointB?.x, top:pointB?.y}} id="pointY"></div>
    </div>
  );
}

export default App;
