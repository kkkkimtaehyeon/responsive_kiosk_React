import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Home.css'
import {useNavigate} from "react-router-dom";
import Camera from "./Camera";


function AIOptionModal(props) {
    const navigate = useNavigate();

    const handleClick = (data) => {
        if (data === 0) {
            navigate("/olderorder");
        } else {
            navigate("/usingai");
        }
    }


    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="aioption-title">편리한 인공지능 주문을 사용해보시겠어요?</div>
                <div className="aioption-content">
                    <p>인공지능을 사용하면 자체 내장된 인공지능이</p>
                    <p>이용자분과 목소리로 이야기를 하면서</p>
                    <p>주문을 할 수 있습니다.</p>
                </div>
                <div>
                    <Button variant="primary" onClick={() => handleClick(0)}>인공지능과 주문</Button>
                    <Button variant="secondary" onClick={() => handleClick(1)}>일반 선택 주문</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const Home = () => {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/youngerorder");
    }

    return (
        <div className='first-container'>
            <div className='first-picture-row'>
                <Camera />
            </div>
            <div className='first-bottom'>
                <button className='first-btn' onClick={handleClick}>매장 이용</button>
                <button className='first-btn' onClick={() => setModalShow(true)}>테이크 아웃</button>
            </div>
            <AIOptionModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div >
    );
};

export default Home;