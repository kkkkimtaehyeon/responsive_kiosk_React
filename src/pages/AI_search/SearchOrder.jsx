import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'react-bootstrap'
import {useLocation, useNavigate} from "react-router-dom";
import AddModal from '../../components/addModal'
import axios from "axios";
import OrderList from "./components/OrderList";
import OrderStats from "./components/OrderStats";

const SearchOrder = () => {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentOrder, setCurrentOrder] = useState({});
    const [modalShow, setModalShow] = useState(false);

    const { state } = useLocation();
    const { menus } = state;
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        if (menus) {
            const fetchData = async () => {
                const menuList = menus.MenuList;
                const queryParams = menuList.map(menu => `id=${menu.id}`).join('&');
                try {
                    const response = await axios.get(`http://localhost:8080/api/menus?${queryParams}`);
                    setDataList(convertJsonArrayToObjectArray(response.data));
                } catch (error) {
                    console.error('no menus contain those ingredients error : ', error);
                }
            };
            fetchData();
        }

    }, [menus]);



    const convertJsonArrayToObjectArray = (menuDetails) => {
        return menuDetails.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                imagePath: item.imagePath
            };
        });
    }





    const handleConfirm = () => {
        navigate("/purchase");
    }

    const handleClear = () => {
        setOrderList([])
        setTotalPrice(0)
    }



    const handleOpen = (data) => {
        setCurrentOrder(data)
        setModalShow(true)
    }


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
                                            <Card.Img variant="top" src={data.imagePath}/>
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

                        <div className='youngerorder-detail gap-3'>

                            {/*주문 목록*/}
                            <OrderList orderList = {orderList} />

                            {/*주문 통계*/}
                            <OrderStats getOrderCount = {getOrderCount} totalPrice = {totalPrice} />

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