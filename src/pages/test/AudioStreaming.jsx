import React, { useEffect, useRef, useState } from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import 'bootstrap/dist/css/bootstrap.min.css'
import OrderList from "../AI_search/components/OrderList";
import OrderStats from "../AI_search/components/OrderStats";
import {useNavigate} from "react-router-dom";

const WebSocketTest = () => {
    const [text, setText] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const wsRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioQueueRef = useRef([]);
    const isPlayingRef = useRef(false);
    const [gptScript, setGptScript] = useState('');
    const navigate = useNavigate();

    //tts
    const { transcript, listening, resetTranscript } = useSpeechRecognition();

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


    //페이지 렌더링 시 웹소켓 open 하는 걸로, 웹소켓이 안열려 있다면 연결
    const startStreaming = () => {
        if (!transcript) {
            alert('Please enter some text to synthesize');
            return;
        }

        wsRef.current = new WebSocket('ws://localhost:8000/websocket/v3/ws');
        wsRef.current.binaryType = 'arraybuffer';

        wsRef.current.onopen = () => {
            console.log('Connected to the WebSocket server');
            audioQueueRef.current = [];
            wsRef.current.send(transcript);
        };

        wsRef.current.onmessage = async (event) => {
            if (event.data instanceof ArrayBuffer) {// 수신받은 메세지 바이너리 데이터면 음성 재생
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
                    if (!isPlayingRef.current && audioQueueRef.current.length >= 2) { // audioQueueRef.current.length >= 2 (최소 2개의 버퍼가 쌓일 때까지 대기)
                        playNextAudio();
                    }
                } catch (error) {
                    console.error('Error decoding audio data:', error);
                }
            } else {//바이너리 데이터(음성데이터)가 아니면
                try {
                    const orderData = JSON.parse(event.data);
                    console.log('Received non-binary message:', orderData);
                    //결제 페이지로 이동
                    navigate("/payment", { state: { orderData: orderData } });
                } catch (e) {
                    setGptScript(event.data);
                }

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

    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            startStreaming();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
        }
    };

    return (
    <Container fluid className="d-flex flex-column min-vh-100">
        <Row className="flex-grow-1 overflow-auto p-4">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mb-4">
                    <Card.Body className="d-flex">
                        <div className="me-3">
                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                AI
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <p className="mb-1 text-muted">AI Assistant</p>
                            <p>{gptScript}</p>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="bg-light p-4">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mb-4">
                    <Card.Body className="d-flex">
                        <div className="me-3">
                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                U
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <p className="mb-1 text-muted">User</p>
                            <p className="overflow-auto">{transcript}</p>
                        </div>
                        <Button
                            className={`ms-auto ${listening ? 'btn-danger' : 'btn-light'}`}
                            style={{ height: '80px', flexShrink: 0 }}
                            onClick={toggleListening}
                        >
                            {listening ? '음성인식 중지' : '음성인식 시작'}
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>




    );
};

export default WebSocketTest;
