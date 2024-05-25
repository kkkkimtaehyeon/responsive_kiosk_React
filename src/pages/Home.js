import React, { useState } from 'react'
import logo from '../assets/images/first.png'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import WebcamCapture from './Camera'
import Card from 'react-bootstrap/Card'
import Pic from '../assets/images/s.jpg'
import { Image } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

function AIOptionModal(props) {
  const navigate = useNavigate()

  const handleClick = data => {
    if (data === 0) {
      navigate('/olderorder')
    } else {
      navigate('/usingai')
    }
  }

  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        <div className='aioption-title'>
          편리한 인공지능 주문을 사용해보시겠어요?
        </div>
        <div className='aioption-content'>
          <p>인공지능을 사용하면 자체 내장된 인공지능이</p>
          <p>이용자분과 목소리로 이야기를 하면서</p>
          <p>주문을 할 수 있습니다.</p>
        </div>

        <div>
          <Button variant='primary' onClick={() => handleClick(0)}>
            인공지능과 주문
          </Button>
          <Button variant='secondary' onClick={() => handleClick(1)}>
            일반 선택 주문
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

function AIOptionModal1(props) {
  const navigate = useNavigate()
  const { onHide } = props
  const handleClick = data => {
    if (data === 0) {
      navigate('/youngerorder')
    } else {
      onHide()
    }
  }

  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>인공지능을</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='photo-list-wrap'>
          <div class='item'>
            <div class='avatar-info'>
              <span class='name'>
                인공지능을 사용하면 자체 내장된 인공지능이
              </span>
              <div style={{ height: 20 }}></div>
              <span class='name'>이용자분과 목소리로 이야기를 하면서</span>
              <div style={{ height: 20 }}></div>
              <span class='name'>주문을 할 수 있습니다.</span>
            </div>
            <Image
              class='avatarImg'
              src={Pic}
              style={{ width: 200, height: 'auto' }}
              responsive
            ></Image>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => handleClick(1)}>
          일반 선택 주문
        </Button>
        <Button variant='primary' onClick={() => handleClick(0)}>
          인공지능과 주문
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const Home = () => {
  const [modalShow, setModalShow] = useState(false)

  const [modalShow1, setModalShow1] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/youngerorder')
  }

  const handleClick_older = () => {
    navigate('/usingai')
  }

  return (
    // <div className='first-container'>
    //     <div className='first-picture-row'>
    //         <WebcamCapture/>
    //         {/* <span>
    //             ABC 카페
    //         </span>
    //         <div className='first-picture'>
    //             <img src={logo} alt='pic' />
    //         </div> */}
    //     </div>
    //     <div className='first-description'>
    //         <p>
    //             ABC 카페에 오신 여러분을 환영합니다!
    //         </p>
    //         <p>
    //             ABC 카페의 키오스크는 여러분의 얼굴을 캡쳐 후,
    //         </p>
    //         <p>
    //             인식된 연령에 맞춰서 맞춤형 인터페이스를 제공합니다
    //         </p>
    //         <p>
    //             맞춤형 인터페이스를 통해 더 편해진 키오스크의 경험을 제공해드립니다!
    //         </p>
    //     </div>
    //     <div className='first-bottom'>
    //         <button className='first-btn' onClick={handleClick}>매장 이용</button>
    //         <button className='first-btn' onClick={() => setModalShow(true)}>테이크 아웃</button>
    //         <button className='first-btn' onClick={() => setModalShow1(true)}>중년층 예시</button>

    //     </div>
    //     <AIOptionModal
    //         show={modalShow}
    //         onHide={() => setModalShow(false)}
    //     />
    //     <AIOptionModal1
    //         show={modalShow1}
    //         onHide={() => setModalShow1(false)}
    //     />
    // </div>
    <div className='base'>
      <Helmet>
        <link
          href='https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH'
          crossOrigin='anonymous'
        />
        <script
          src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
          integrity='sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz'
          crossOrigin='anonymous'
        ></script>
        <style>
          {`
            .nanum-gothic-regular {
              font-family: "Nanum Gothic", sans-serif;
              font-weight: 400;
              font-style: normal;
            }
          `}
        </style>
      </Helmet>
      <nav className='navbar fixed-top bg-body-tertiary'>
        <div className='container-fluid'>
          <a className='navbar-brand'>ABC 카페 키오스크</a>
          <button
            type='button'
            className='btn btn-success call-staff'
            data-bs-toggle='modal'
            data-bs-target='#callStaff'
          >
            직원 호출
          </button>
        </div>
      </nav>
      <div
        className='modal fade'
        id='callStaff'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                직원 호출
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              키오스크 사용이 어려우신가요? 직원이 도와드리겠습니다!
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                닫기
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                data-bs-target='#calledStaff'
              >
                직원 호출
              </button>
            </div>
          </div>
        </div>
      </div>
      <p
        style={{
          position: 'absolute',
          top: '20%',
          left: '16%',
          fontSize: '80pt'
        }}
      >
        ABC 카페
      </p>
      <div
        className='sogae'
        style={{
          fontSize: '18pt',
          position: 'absolute',
          top: '45%',
          left: '16%'
        }}
      >
        <p>ABC 카페에 오신 여러분을 환영합니다!</p>
        <p>ABC 카페의 키오스크는 여러분의 얼굴을 캡쳐 후,</p>
        <p>인식된 연령에 맞춰서 맞춤형 인터페이스를 제공합니다.</p>
        <p>
          맞춤형 인터페이스를 통해 더 편해진 키오스크의 경험을 제공해드립니다!
        </p>
      </div>
      <img
        src='https://www.iconarchive.com/download/i134299/iconarchive/fat-sugar-food/Drink-Coffee.1024.png'
        style={{
          position: 'absolute',
          scale: 'calc(0.3)',
          left: '30%',
          bottom: '-30%'
        }}
        alt='커피 이미지'
      />
      {showVideo && <WebcamCapture />}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '40%',
          scale: 'calc(3)'
        }}
      >
        <button className='btn btn-primary' onClick={handleClick}>
          매장 주문
        </button>
        <button className='btn btn-secondary' onClick={handleClick_older}>
          테이크 아웃
        </button>

        <button
          className='btn btn-primary'
          onClick={() => setShowVideo(!showVideo)}
        >
          안면 인식
        </button>
      </div>
    </div>
  )
}

export default Home
