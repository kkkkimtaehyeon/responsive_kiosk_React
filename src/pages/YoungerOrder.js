import React, {useState} from 'react';
import './YoungerOrder.css'
import {Row, Col,  Badge} from 'react-bootstrap'


import Card from 'react-bootstrap/Card';
import Pic from '../images/completeImg.png';
import {useNavigate} from "react-router-dom";
import AddModal from '../components/addModal';

import {Input ,Button, Space} from "antd";

const YoungerOrder = () => {
    const navigate = useNavigate();
    const dataList = [{
        id: 1,
        name: '아메리카노111111111111111111',
        price: 3000,
        temperature : 'Hot'
    },
        {
            id: 2,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 3,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 4,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 5,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 6,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 7,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 8,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 9,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 10,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 11,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 12,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 13,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        }, {
            id: 2,
            name: '카페라떼',
            price: 3500,
            temperature : 'Hot'
        },
        {
            id: 3,
            name: '바닐라라떼',
            price: 3700,
            temperature : 'Hot'
        }]

    const [orderList, setOrderList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const handleConfirm = () => {
        navigate("/purchase");
    }

    const handleClear = () => {
        setOrderList([])
        setTotalPrice(0)
        navigate("/")
    }

    const [currentOrder, setCurrentOrder] = useState({})

    const handleOpen = (data) => {
        setCurrentOrder(data)
        setModalShow(true)
    }

    const [modalShow, setModalShow] = useState(false);
    const handleAdd = (data) => {
        const idx = orderList.findIndex((order) => {
            return order.temperature === data.temperature && order.id === data.id
        } )
        if (idx !== -1) {
            const newOrderList = [...orderList]
            newOrderList[idx].count += 1
            setOrderList(newOrderList)
        } else {
            setOrderList([...orderList, {...data, count: 1}])
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


    const add = (data) => {
        const idx = orderList.findIndex((order) => {
            return order.temperature === data.temperature && order.id === data.id
        } )
        debugger
        if (idx !== -1) {
            const newOrderList = [...orderList]
            newOrderList[idx].count += 1
            setOrderList(newOrderList)
        } else {
            setOrderList([...orderList, {...data, count: 1}])
        }
        setTotalPrice(totalPrice + data.price)
    }
    const reduce = (data) => {
        const idx = orderList.findIndex((order) => {
            return order.temperature === data.temperature && order.id === data.id
        } )
        if (idx !== -1) {
            const newOrderList = [...orderList]
            if(newOrderList[idx].count!==1){
                newOrderList[idx].count -= 1
            }else
            {
                return
            }

            setOrderList(newOrderList)
        } else {
            setOrderList([...orderList, {...data, count: 1}])
        }
        setTotalPrice(totalPrice - data.price)
    }
    const reduceone =
        () => {

            // this.props.dispatch(setdata({
            //     id,
            //     count
            // }))
        }
    return (
        <div className='youngerorder-container'>
            <Row style={{height: '100%', width: '100%'}}>
                <Col md={2}>
                    <ul className="navbar-nav flex-column youngerorder-nav-list">
                        <li className="nav-item">
                            <button className="btn btn-primary nav-link">커피</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-secondary nav-link">논커피</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-warning nav-link">주스</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger nav-link">디저트</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-success nav-link">티</button>
                        </li>
                    </ul>
                </Col>
                <Col md={6} className='youngerorder-middle'>
                    <Row style={{height:500,overflow:"auto"}}>
                        {dataList.map((data) => {
                            return (
                                <Col md={3} key={data.id} style={{margin: '5px 0'}}>
                                    <Card onClick={() => handleOpen(data)}>
                                        <Card.Img variant="top" src={Pic}/>
                                        <Card.Body>
                                            <Card.Title className="truncate-title">{data.name}</Card.Title>
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
                    <div className='youngerorder-detail'>
                        <div className='youngerorder-detail-top'>

                            <Row>
                                <Col md={2} style={{fontSize: 18}}>주문</Col>
                                <Col md={4} style={{fontSize: 18}}>주문</Col>
                                <Col md={4} style={{fontSize: 18}}>주문</Col>
                                <Col md={2} style={{fontSize: 18}}>주문</Col>
                            </Row>
                            {orderList.map((order) => {

                                    return (
                                        <Row key={order.id}>
                                            <Col md={2} style={{fontSize: 18}}>
                                                <Badge bg={order.temperature ==='Hot'?'danger':'primary' }>{order.temperature}</Badge></Col>
                                            <Col md={4} style={{fontSize: 18}} className="truncate-title">{order.name}</Col>
                                            <Col md={4} style={{fontSize: 18}}>
                                                <Space.Compact style={{ width: '100%' }}>
                                                    <Button  size ="small" type="primary" onClick={() => reduce(order)}>-</Button>

                                                    <Input  size ="small" value={order.count} />

                                                    <Button size ="small" type="primary" onClick={() => add(order)}>+</Button>
                                                </Space.Compact>
                                            </Col>
                                            <Col md={2} style={{fontSize: 18}}>{order.price * order.count}￦</Col>
                                        </Row>
                                    )
                                }
                            )}
                        </div>
                        <div className='youngerorder-detail-middle'>
                            <Row>
                                <Col md={6}>
                                    <span style={{fontSize: 36}}>주문 개수</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{fontSize: 36, color: 'rgba(255,0,0,1)'}}>{getOrderCount()} 개</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <span style={{fontSize: 36}}>결제 금액</span>
                                </Col>
                                <Col md={6}>
                                    <span style={{fontSize: 36, color: 'rgba(255,0,0,1)'}}>{totalPrice} ￦</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='youngerorder-detail-bottom'>
                            <div style={{
                                backgroundColor: 'rgba(255,81,81,1)', width: '70%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleConfirm}>
                                <span style={{fontSize: 60}}>주문 확정</span>
                            </div>
                            <div md={3} style={{
                                backgroundColor: 'rgba(226,226,226,1)', width: '30%', height: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={handleClear}>
                                <span style={{fontSize: 30, color: 'rgba(0,0,0,1)'}}>주문
                                    취소</span>
                            </div>
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
    );
};

export default YoungerOrder;