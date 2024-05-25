import React, { useRef, useEffect } from 'react'
import axios from 'axios'
const WebcamCapture = () => {
  const videoRef = useRef()
  const canvasRef = useRef()

  const divStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    padding: '20px',
    backgroundColor: 'lightblue',
    border: '1px solid black'
  }

  useEffect(() => {
    console.log(navigator.mediaDevices.getUserMedia)
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing webcam:', error)
      }
    }

    enableVideoStream()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject
        const tracks = stream.getTracks()

        tracks.forEach(track => {
          track.stop()
        })
      }
    }
  }, [])

  const takeSnapshotAndSendToServer = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      //웹캡 스펙에 따라 달라질 수 있음.
      console.log(video.videoWidth) //640
      console.log(video.videoHeight) //480

      //width, height 확인하고 설정
      canvasRef.current.width = 640
      canvasRef.current.height = 480

      context.drawImage(
        video,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )

      canvas.toBlob(blob => {
        const formData = new FormData()
        formData.append('capturedImg', blob, 'captured_face.png')

        axios
          .post('http://localhost:8080/face-capture', formData)
          .then(response => {
            // Handle response from server if needed
          })
          .catch(error => {
            console.error('Error uploading image:', error)
          })
      }, 'image/png')
    }
  }

  return (
    <div style={divStyle}>
      <video ref={videoRef} autoPlay={true} />
      <button onClick={takeSnapshotAndSendToServer}>사진을 찍다</button>
      <button onClick={takeSnapshotAndSendToServer}>사진을 찍다</button>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default WebcamCapture
