import './App.css';
import WebcamCapture from "./functions/WebcamCapture";
import AudioRecord from "./functions/AudioRecord";

function App() {
  return (
    <div className="App">
      <WebcamCapture />
      <AudioRecord />
    </div>
  );
}

export default App;
