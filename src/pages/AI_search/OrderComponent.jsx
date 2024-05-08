import React, { useState } from 'react';
import '../YoungerOrder.css'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import Pic from '../../swallow.jpg';
import { useNavigate } from "react-router-dom";
import AddModal from '../../components/addModal'

const YoungerOrder = () => {
    const navigate = useNavigate();
    const dataList = [
        {
            id: 1,
            name: '아메리카노',
            price: 3000
        },
        {
            id: 2,
            name: '카페라떼',
            price: 3500
        },
        {
            id: 3,
            name: '바닐라라떼',
            price: 3700
        }
    ]

    const [orderList, setOrderList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const handleConfirm = () => {
        navigate("/purchase");
    }

    const handleClear = () => {
        setOrderList([])
        setTotalPrice(0)
    }

    const [currentOrder, setCurrentOrder] = useState({})

    const handleOpen = (data) => {
        setCurrentOrder(data)
        setModalShow(true)
    }

    const [modalShow, setModalShow] = useState(false);
    const handleAdd = (data) => {
        const idx = orderList.findIndex((order) => order.id === data.id)
        if (idx !== -1) {
            const newOrderList = [...orderList]
            newOrderList[idx].count += 1
            setOrderList(newOrderList)
        }
        else {
            setOrderList([...orderList, { ...data, count: 1 }])
        }
        setTotalPrice(totalPrice + data.price)
    }

    const getOrderCount = () => {
        let count = 0
        orderList.forEach((order) => {
            count += order.count
        })
        return count
    }

    return (
        <div className='container'>
            <div className='youngerorder-container'>
                <Row style={{height: '100%', width: '100%'}}>
                    <Col md={6} className='youngerorder-middle'>
                        <Row>
                            {dataList.map((data) => {
                                return (
                                    <Col md={3} key={data.id} style={{margin: '5px 0'}}>
                                        <Card onClick={() => handleOpen(data)}>
                                            <Card.Img variant="top" src={Pic}/>
                                            <Card.Body>
                                                <Card.Title>{data.name}</Card.Title>
                                                <Card.Text>
                                                    <span style={{color: 'red'}}>{data.price}￦</span>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>)
                            })}
                        </Row>
                    </Col>
                    <Col md={4}>
                        {/*주문 목록*/}
                        <div className='youngerorder-detail gap-3'>
                            <div className='card rounded-4 shadow-sm border-0'>
                                <div className='card-body'>
                                    <span><h3>주문 목록</h3></span>
                                    {orderList.map((order) => {
                                            return (
                                                <Row key={order.id}>
                                                    <Col md={5}><h5>{order.name}</h5></Col>
                                                    <Col md={3}><h5>{order.count}</h5></Col>
                                                    <Col md={4}><h5>{order.price * order.count}￦</h5></Col>
                                                </Row>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                            {/*주문 통계*/}
                            <div className='card rounded-4 shadow-sm border-0 gap-2'>
                                <div className='card-body'>
                                    <Row>
                                        <Col md={6}><h3>주문 개수</h3></Col>
                                        <Col md={6}><h5>{getOrderCount()} 개</h5></Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}><h3>결제 금액</h3></Col>
                                        <Col md={6}><h5>{totalPrice}￦</h5></Col>
                                    </Row>
                                </div>
                            </div>
                            {/*주문 진행*/}
                            <div className='youngerorder-detail-bottom'>
                                <div className='btn btn-primary' onClick={handleConfirm}><h3>주문 확정</h3></div>
                                <div className='btn btn-danger' onClick={handleClear}><h3>주문 취소</h3></div>
                            </div>

                        </div>
                    </Col>
                </Row>
                <AddModal
                    data={currentOrder}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onAdd={handleAdd}/>
            </div>

        </div>

    );
};

export default YoungerOrder;