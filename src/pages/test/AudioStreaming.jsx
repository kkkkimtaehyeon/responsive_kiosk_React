// import React, { useEffect, useRef, useState } from 'react';
//
// const AudioStreaming = () => {
//     const [text, setText] = useState("");
//     const audioRef = useRef(null);
//     const ws = useRef(null);
//     const audioQueue = useRef([]);
//     const audioContextRef = useRef(null);
//
//     useEffect(() => {
//         // WebSocket 연결
//         ws.current = new WebSocket('ws://localhost:8000/websocket/v3/ws');
//
//         ws.current.onmessage = (event) => {
//             console.log(event.data);
//             audioQueue.current.push(event.data);
//             console.log("오디오 버퍼 : ", audioQueue.current);
//             let audioBuffer = '';
//             while (audioBuffer = audioQueue.current.shift()) {
//                 const source = audioContextRef.current.createBufferSource();
//                 source.buffer = audioBuffer;
//                 source.connect(audioContextRef.current.destination);
//                 source.start();
//
//             }
//         };
//
//         // 클린업 함수
//         return () => {
//             ws.current.close();
//         };
//     }, []);
//
//     const handleTextChange = (e) => {
//         setText(e.target.value);
//     };
//
//     const handleSendText = () => {
//         if (text.trim() !== "") {
//             ws.current.send(text);
//         }
//     };
//
//     return (
//         <div>
//             <textarea
//                 rows="4"
//                 cols="50"
//                 value={text}
//                 onChange={handleTextChange}
//                 placeholder="Enter text here..."
//             />
//             <br/>
//             <button onClick={handleSendText}>Send Text</button>
//             <h1>Audio Streaming</h1>
//             <audio ref={audioRef} controls/>
//         </div>
//     );
// };
//
// export default AudioStreaming;



import { useEffect, useRef, useState } from "react";

const WebSocketTest = () => {
    const [text, setText] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const wsRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioQueueRef = useRef([]);
    const isPlayingRef = useRef(false);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return () => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.close();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const startStreaming = () => {
        if (!text) {
            alert('Please enter some text to synthesize');
            return;
        }

        wsRef.current = new WebSocket('ws://localhost:8000/websocket/v3/ws');
        wsRef.current.binaryType = 'arraybuffer';

        wsRef.current.onopen = () => {
            console.log('Connected to the WebSocket server');
            audioQueueRef.current = [];
            wsRef.current.send(text);
        };

        wsRef.current.onmessage = async (event) => {
            if (event.data instanceof ArrayBuffer) {
                console.log('Received binary data');
                const arrayBuffer = event.data;
                try {
                    const audioContext = audioContextRef.current;
                    if (!audioContext) {
                        console.error('Audio context is not initialized.');
                        return;
                    }
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    audioQueueRef.current.push(audioBuffer);
                    console.log("오디오 버퍼 : ", audioQueueRef.current);
                    if (!isPlayingRef.current) { // audioQueueRef.current.length >= 2 최소 2개의 버퍼가 쌓일 때까지 대기
                        playNextAudio();
                    }
                } catch (error) {
                    console.error('Error decoding audio data:', error);
                }
            } else {
                console.error('Received non-binary message:', event.data);
            }
        };

        wsRef.current.onclose = () => {
            console.log('Disconnected from the WebSocket server');
            setIsStreaming(false);
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setIsStreaming(true);
    };

    const playNextAudio = () => {
        if (audioQueueRef.current.length > 0) {
            isPlayingRef.current = true;
            const audioBuffer = audioQueueRef.current.shift();
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.start();
            source.onended = () => {
                if (audioQueueRef.current.length > 0) {
                    playNextAudio();
                } else {
                    isPlayingRef.current = false;
                }
            };
        } else {
            isPlayingRef.current = false;
        }
    };

    const stopStreaming = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.close();
        }
        setIsStreaming(false);
    };

    return (
        <div>
            <h1>Real-time Text-to-Speech Streaming</h1>
            <textarea
                rows="4"
                cols="50"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
            />
            <br />
            <button onClick={startStreaming} disabled={isStreaming}>
                Start Streaming
            </button>
            <button onClick={stopStreaming} disabled={!isStreaming}>
                Stop Streaming
            </button>
        </div>
    );
};

export default WebSocketTest;
