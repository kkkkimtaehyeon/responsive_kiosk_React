import React, { useRef, useEffect } from 'react';
import axios from "axios";
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const WebcamCapture = () => {
    const videoRef = useRef();
    const canvasRef = useRef();
    const navigate = useNavigate();
    const tempPort = "localhost:8000";

    const navigateHandler = (option) => {
        if (option === 1 || option === 2) {
            navigate("/search-order");
        } else if (option === 2) {
            navigate("/ai-order");
        }
    }

    useEffect(() => {
        const enableVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        enableVideoStream();

        return () => {
            const videoNode = videoRef.current;
            if (videoNode && videoNode.srcObject) {
                const stream = videoNode.srcObject;
                const tracks = stream.getTracks();

                tracks.forEach(track => {
                    track.stop();
                });
            }
        };

    }, []);

    const takeSnapshot = async () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // 웹캠 스펙에 따라 달라질 수 있음.
            console.log(video.videoWidth); // 640
            console.log(video.videoHeight); // 480

            // width, height 확인하고 설정
            canvasRef.current.width = 640;
            canvasRef.current.height = 480;

            context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

            canvas.toBlob(blob => {
                sendSnapShotToServer(blob);
            }, 'image/jpeg');
        }
    };

    const sendSnapShotToServer = (blob) => {
        const formData = new FormData();
        const fileName = `captured_face_${uuid()}.jpg`;
        formData.append('image_file', blob, fileName);

        axios.post(`http://${tempPort}/fast/api/face-recognition`, formData)
            .then(response => {
                navigateHandler(response.data);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    }

    return (
        <Container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
            <video ref={videoRef} autoPlay={true} style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <button
                className="btn btn-lg"
                onClick={takeSnapshot}
                style={{ width: '100%', height: '100%' }}
            >
                아무곳이나 터치해 시작하세요
            </button>
        </Container>
    );
};

export default WebcamCapture;
