import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from "react-router-dom";


const WebSocketTest = () => {
    const wsRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioQueueRef = useRef([]);
    const isPlayingRef = useRef(false);
    const [gptScript, setGptScript] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const tempPort = process.env.REACT_APP_SERVER_PORT;

    const { transcript, listening, resetTranscript } = useSpeechRecognition();



    useEffect(() => {
        const connect = () => {
            wsRef.current = new WebSocket(`wss://${tempPort}/ws/v4/openai`);
            wsRef.current.binaryType = 'arraybuffer';

            wsRef.current.onopen = () => {
                console.log('웹소켓 연결 성공!');
                console.log(location);
                audioQueueRef.current = [];
            };
        }

        connect();
        
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

        wsRef.current.onclose = () => {
            console.log('웹소켓 연결 종료!');

            setTimeout(connect(), 1000);
            console.log('웹소켓 재연결');
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.close();
                audioContextRef.current.close();
                audioQueueRef.current = [];
                isPlayingRef.current = false;
            }
        };
    }, [tempPort, location]);

    const startStreaming = () => {
        if (!transcript) {
            alert('음성으로 주문을 진행하세요.');
            return;
        }
        wsRef.current.send(transcript);

        wsRef.current.onmessage = async (event) => {
            if (event.data instanceof ArrayBuffer) {
                const arrayBuffer = event.data;
                try {
                    const audioContext = audioContextRef.current;
                    if (!audioContext) {
                        console.error('Audio context is not initialized.');
                        return;
                    }
                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    audioQueueRef.current.push(audioBuffer);

                    if (!isPlayingRef.current) {
                        playNextAudio();
                    }
                } catch (error) {
                    console.error('Error decoding audio data:', error);
                }
            } else {
                try {
                    const orderData = JSON.parse(event.data);
                    navigate("/payment", { state: { orderData: orderData } });
                } catch (e) {
                    setGptScript(event.data);
                }
            }
        };
    };

    const playNextAudio = async () => {
        if (audioQueueRef.current.length > 0) {
            isPlayingRef.current = true;
            const audioBuffer = audioQueueRef.current.shift();
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.start();
            console.log('Playing audio buffer', audioBuffer);

            // 현재 오디오 버퍼 재생이 끝나면 다음 오디오 버퍼 재생
            source.onended = () => {
                if (audioQueueRef.current.length > 0) {
                    playNextAudio();
                } else {
                    isPlayingRef.current = false;
                    console.log('All audio buffers played');
                    setTimeout(() => {
                        wsRef.current.send('[응답이 없으면 5초뒤에 처음으로 돌아갑니다]라고 그대로 반환해줘 ');
                        setTimeout(() => navigate("/main"), 5000);
                    }, 5000);
                }
            };
        } else {
            isPlayingRef.current = false;
            console.log('No audio buffers to play');
        }
    };

    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            startStreaming();

            console.log('음성인식 대기 중입니다.');
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
            console.log(audioQueueRef)
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

                        </Card.Body>
                    </Card>
                    <Button
                        onClick={toggleListening}
                        className={`w-100 ${listening ? 'btn-danger' : 'btn-secondary'}`}
                        style={{ height: '80px' }}
                    >
                        {listening ? '음성인식 중지' : '음성인식 시작'}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default WebSocketTest;