import React from 'react';
import './UsingAI.css'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

const UsingAI = () => {
    const navigate = useNavigate();
    const handleConfirm = () => {
        navigate("/purchase");
    }

    const handleClear = () => {
    }
    return (
        <div className='usingai-container'>
            <Row style={{ height: '100%', width: '100%' }}>
                <Col md={8} className='usingai-left'>
                    <Row style={{ height: '80%' }}>
                        <span style={{ fontSize: 48 }}>AI</span>
                        <span style={{ fontSize: 32 }}>카페라떼 두 잔이 추가됐어요!
                            그 다음은 어떤 걸 도와드릴까요?</span>
                    </Row>
                    <Row style={{ height: '20%', borderTop: '6px solid rgba(0, 0, 0, 1)' }}>
                        <span style={{ fontSize: 48 }}>사용자</span>
                        <span style={{ fontSize: 32 }}>카페라떼 두 잔 추가해줘.</span>
                    </Row>
                </Col>
                <Col md={4}>
                    <div className='usingai-detail'>
                        <div className='usingai-detail-top'>
                            <span style={{ fontSize: 36 }}>주문 목록</span>
                            <Row>
                                <Col md={5} style={{ fontSize: 32 }}>아메리카노</Col>
                                <Col md={3} style={{ fontSize: 32 }}>1</Col>
                                <Col md={4} style={{ fontSize: 32 }}>3,000￦</Col>
                            </Row>
                            <Row>
                                <Col md={5} style={{ fontSize: 32 }}>카페라떼</Col>
                                <Col md={3} style={{ fontSize: 32 }}>2</Col>
                                <Col md={4} style={{ fontSize: 32 }}>7,000￦</Col>
                            </Row>
                        </div>
                        <div className='usingai-detail-middle'>
                            <Row>
                                <Col md={6}>
                                    <span style={{ fontSize: 36 }}>주문 개수</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{ fontSize: 36, color: 'rgba(255,0,0,1)' }}>3 개</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <span style={{ fontSize: 36 }}>결제 금액</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{ fontSize: 36, color: 'rgba(255,0,0,1)' }}>10,000 ￦</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='usingai-detail-bottom'>
                            <div style={{
                                backgroundColor: 'rgba(255,81,81,1)', width: '70%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleConfirm}>
                                <span style={{ fontSize: 60 }}>주문 확정</span>
                            </div>
                            <div md={3} style={{
                                backgroundColor: 'rgba(226,226,226,1)', width: '30%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleClear}>
                                <span style={{ fontSize: 30, color: 'rgba(0,0,0,1)' }}>주문
                                    취소</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row >
        </div >
    );
};

export default UsingAI;