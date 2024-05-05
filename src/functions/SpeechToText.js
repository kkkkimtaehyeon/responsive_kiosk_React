import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";
import {useEffect, useState} from "react";

const SpeechToText = () => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [gptScript, setGptScript] = useState();
    const [audioUrl, setAudioUrl] = useState('');

    useEffect(() => {
        // audioUrl이 변경될 때마다 새로운 오디오 객체 생성 및 재생
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    }, [audioUrl]);

    const audioHandler = (response) => {
        setAudioUrl(response.data.gptAudioUrl);
    }

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

        axios.post('http://localhost:8000/fast/api/script-order', userScript)
            .then(response => {
                console.log('suc', response.data);
                resetTranscript(); //사용자 script를 reset

                setGptScript(response.data.gptScript); //응답 받은 gpt script를 설정해줌.
                audioHandler(response); //응답 받은 gpt audio url를 재생.
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
            <p id="gptScript">{gptScript}</p>
        </>
    );
};

export default SpeechToText;
