import React, {useCallback, useState} from "react";
import axios from "axios";

const AudioRecord = () => {
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [recBtnText, setRecBtnText] = useState('녹음 하기');

    function changeRecBtn() {
        setRecBtnText(onRec ? "녹음 종료" : "녹음 하기");
        document.getElementById('recBtn').innerText = recBtnText;
    }
    const onRecAudio = () => {
        // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);

        function makeSound(stream) {
            // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
            const source = audioCtx.createMediaStreamSource(stream);
            setSource(source);

            // AudioBufferSourceNode 연결
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }

        // 마이크 사용 권한 획득 후 녹음 시작
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            makeSound(stream);
            // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
            analyser.onaudioprocess = function (e) {
                setOnRec(false);
            };
        });
    };

    const offRecAudio = () => {
        // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
        media.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
        };

        // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
        stream.getAudioTracks().forEach(function (track) {
            track.stop();
        });

        // 미디어 캡처 중지
        media.stop();

        // 메서드가 호출 된 노드 연결 해제
        analyser.disconnect();
        source.disconnect();
    };

    /*const createAudioFileFromBlob = useCallback(() => {
        if (audioUrl) {
            console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
        }
        // File 생성자를 사용해 파일로 변환
        const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
        console.log('audio file : ', sound); // File 정보 출력
    }, [audioUrl]);*/

    const createAudioFileFromBlob = useCallback(() => {
        if(audioUrl) {
            //녹음된 음성 재생
            const audioElement = new Audio(URL.createObjectURL(audioUrl));
            audioElement.play();

            const recoredAudioFile = new File([audioUrl], "recordedAudio.wav", { lastModified: new Date().getTime(), type: "mimeType" });
            return recoredAudioFile;
        }
    }, [audioUrl]);

    const uploadAudioFile = () => {
        const formdata = new FormData();
        formdata.append("audioFile", createAudioFileFromBlob());

        //need to change url
        axios.post('http://localhost:8080/audio', formdata)
            .then(response => {
                console.log('success!', response);
            })
            .catch(error => {
                console.log('fail!', error);
            })
    }


    return (
        <>
            <button onClick={() => {
                onRec ? onRecAudio() : offRecAudio();
                changeRecBtn();
            }} id='recBtn'>{recBtnText}</button>
            <button onClick={uploadAudioFile}>결과 확인</button>
        </>
    );
};

export default AudioRecord;