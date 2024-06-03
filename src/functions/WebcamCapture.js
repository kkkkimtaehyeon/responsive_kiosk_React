import React, { useRef, useEffect } from 'react';
import axios from "axios";
import uuid from 'react-uuid';
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const WebcamCapture = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const tempPort = "localhost:8000";

    const navigateHandler = (option) => {
        if (option === "1" || option === "2") {
            navigate("/search-order");
        } else if (option === "3") { // 수정된 부분
            navigate("/ai-order");
        }
    };

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
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
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

            console.log(video.videoWidth); //640
            console.log(video.videoHeight); //480

            canvas.width = 640;
            canvas.height = 480;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(blob => {
                if (blob) {
                    sendSnapshotToServer(blob);
                }
            }, 'image/jpeg');
        }
    };

    const sendSnapshotToServer = (blob) => {
        const formData = new FormData();
        const fileName = `captured_face_${uuid()}.jpg`;
        formData.append('image_file', blob, fileName);

        axios.post(`http://${tempPort}/fast/api/face-recognition`, formData)
            .then(response => {
                navigateHandler(response.data.option);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    };

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
