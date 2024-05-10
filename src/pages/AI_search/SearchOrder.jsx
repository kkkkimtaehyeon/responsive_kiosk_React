import React, { useState } from 'react';
 import {Row, Col, CardBody} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import Pic from '../../swallow.jpg';
import {useLocation, useNavigate} from "react-router-dom";
import AddModal from '../../components/addModal'
import Button from "react-bootstrap/Button";

const SearchOrder = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { menus } = state;
    const convertJsonArrayToObjectArray = (menus) => {
        const objectArray = menus.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price
            };
        });
        return objectArray;
    }
    const dataList = convertJsonArrayToObjectArray(menus);

    const [orderList, setOrderList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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

    const backToSearch = () => {
        navigate("/search");
    }

    return (
        <div className='container'>
            <div className='youngerorder-container'>
                <div className="d-grid gap-2">
                    <button className="btn btn-info rounded-4" type="button" onClick={backToSearch}><h3>다시 검색</h3></button>
                </div>
                <Row style={{height: '100%', width: '100%'}}>
                    <Col md={8} className='youngerorder-middle'>
                        <Row>
                        {dataList.map((data) => {
                                return (
                                    <Col md={3} key={data.id} style={{margin: '5px 0'}}>
                                        <Card className="rounded-4 shadow-sm border-0" onClick={() => handleOpen(data)}>
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
                            <Card className='rounded-4 shadow-sm border-0'>
                                <CardBody>
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
                                </CardBody>
                            </Card>
                            {/*주문 통계*/}
                            <Card className='rounded-4 shadow-sm border-0 gap-2'>
                                <CardBody>
                                    <Row>
                                        <Col md={6}><h3>주문 개수</h3></Col>
                                        <Col md={6}><h5>{getOrderCount()} 개</h5></Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}><h3>결제 금액</h3></Col>
                                        <Col md={6}><h5>{totalPrice}￦</h5></Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            {/*주문 진행*/}
                            <div className="d-grid gap-2">
                                <Button className='btn-primary rounded-4' onClick={handleConfirm}><h3>주문 확정</h3></Button>
                                <Button className='btn-danger rounded-4' onClick={handleClear}><h3>주문 취소</h3></Button>
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

export default SearchOrder;