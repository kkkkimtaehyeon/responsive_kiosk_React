import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";

const SpeechToText = () => {
    const { transcript, finalTranscript, listening, resetTranscript } = useSpeechRecognition();

    const toggleListening = () => {
        if (listening) {

            SpeechRecognition.stopListening();
            sendUserScript();

        } else {
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
        }
    }

    const sendUserScript = (finalTranscript) => {
        const userScript = {
            "userScript": document.getElementById('userScript').value// 수정된 부분
        };

        axios.post('http://localhost:8000/api/user-script', userScript)
            .then(response => {
                console.log('suc', response.data);
                resetTranscript();
            })
            .catch(error => {
                console.log('err', error);
            })

    }

    return (
        <>
            <textarea className="transcript" id="userScript" value={transcript} onChange={() => {}}/>
            <button onClick={toggleListening}>
                {listening ? '음성인식 중지' : '음성인식 시작'}
            </button>
        </>
    );
};

export default SpeechToText;
