import './App.css';
import WebcamCapture from "./functions/WebcamCapture";
import AudioRecord from "./functions/AudioRecord";
import useSpeechToText from "./functions/SpeechToText";
import SpeechRecognition from "react-speech-recognition";
import SpeechToText from "./functions/SpeechToText";

/*function App() {
  return (
    <div className="App">
      <WebcamCapture />
      <AudioRecord />
    </div>
  );
}

export default App;*/
const App = () => {

    return (
        <div className="App">
            <WebcamCapture/>
            <SpeechToText/>
        </div>
    );
};

export default App;