import React, { useState } from "react";
import "./YoungerOrder.css";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Pic from "../assets/images/americano.jpg";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddModal from "../components/addModal";
import { Input, Button, Space } from "antd";

const YoungerOrder = () => {
  const navigate = useNavigate();
  const dataList = [
    { id: 1, name: "아메리카노", price: 3000 },
    { id: 2, name: "카페라떼", price: 3500 },
    { id: 3, name: "바닐라라떼", price: 3700 },
    { id: 1, name: "아메리카노", price: 3000 },
    { id: 2, name: "카페라떼", price: 3500 },
    { id: 3, name: "바닐라라떼", price: 3700 },
    { id: 1, name: "아메리카노", price: 3000 },
    { id: 2, name: "카페라떼", price: 3500 },
    { id: 3, name: "바닐라라떼", price: 3700 },
    { id: 1, name: "아메리카노", price: 3000 },
    { id: 2, name: "카페라떼", price: 3500 },
    { id: 3, name: "바닐라라떼", price: 3700 },
  ];

  const [orderList, setOrderList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});

  const handleConfirm = () => {
    navigate("/purchase");
  };

  const handleClear = () => {
    setOrderList([]);
    setTotalPrice(0);
    navigate("/");
  };

  const handleOpen = (data) => {
    setCurrentOrder(data);
    setModalShow(true);
  };

  const handleAdd = (data) => {
    const idx = orderList.findIndex((order) => order.id === data.id);
    if (idx !== -1) {
      const newOrderList = [...orderList];
      newOrderList[idx].count += 1;
      setOrderList(newOrderList);
    } else {
      setOrderList([...orderList, { ...data, count: 1 }]);
    }
    setTotalPrice(totalPrice + data.price);
  };

  const handleDelete = (id) => {
    const newOrderList = orderList.filter((order) => order.id !== id);
    const deletedOrder = orderList.find((order) => order.id === id);
    setOrderList(newOrderList);
    setTotalPrice(totalPrice - deletedOrder.price * deletedOrder.count);
  };

  const getOrderCount = () => {
    let count = 0;
    orderList.forEach((order) => {
      count += order.count;
    });
    return count;
  };

  const add = (data) => {
    const idx = orderList.findIndex(
      (order) => order.temperature === data.temperature && order.id === data.id
    );
    if (idx !== -1) {
      const newOrderList = [...orderList];
      newOrderList[idx].count += 1;
      setOrderList(newOrderList);
    } else {
      setOrderList([...orderList, { ...data, count: 1 }]);
    }
    setTotalPrice(totalPrice + data.price);
  };

  const reduce = (data) => {
    const idx = orderList.findIndex(
      (order) => order.temperature === data.temperature && order.id === data.id
    );
    if (idx !== -1) {
      const newOrderList = [...orderList];
      if (newOrderList[idx].count > 1) {
        newOrderList[idx].count -= 1;
        setOrderList(newOrderList);
        setTotalPrice(totalPrice - data.price);
      } else {
        handleDelete(data.id);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "auto",
        padding: 10,
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: 300, overflow: "auto", scrollbarWidth: "none" }}>
        <ul className="navbar-nav flex-column">
          <li className="nav-item">
            <button
              className="btn btn-primary nav-link"
              style={{
                fontSize: "48pt",
                width: "250px",
                height: "150px",
              }}
            >
              커피
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-secondary nav-link"
              style={{
                fontSize: "48pt",
                width: "250px",
                height: "150px",
              }}
            >
              논커피
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-warning nav-link"
              style={{
                fontSize: "48pt",
                width: "250px",
                height: "150px",
              }}
            >
              주스
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-danger nav-link"
              style={{
                fontSize: "48pt",
                width: "250px",
                height: "150px",
              }}
            >
              디저트
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-success nav-link"
              style={{
                fontSize: "48pt",
                width: "250px",
                height: "150px",
              }}
            >
              티
            </button>
          </li>
        </ul>
      </div>
      <div
        style={{ flex: 1, display: "flex", flexWrap: "wrap", overflow: "auto" }}
      >
        {dataList.map((item) => (
          // <Col key={item.id} style={{ padding: "0 10px" }}>
          <Card
            onClick={() => handleOpen(item)}
            style={{ width: 200, margin: "0 0 10px 10px" }}
          >
            <Card.Img variant="top" src={Pic} />
            <Card.Body>
              <Card.Title>
                <h3 style={{ textAlign: "center" }}>{item.name}</h3>
              </Card.Title>
              <Card.Text>
                <h4 style={{ color: "red", textAlign: "center" }}>
                  {item.price}￦
                </h4>
              </Card.Text>
            </Card.Body>
          </Card>
          // </Col>
        ))}
      </div>
      <div style={{ width: 450, position: "relative" }}>
        <table
          className="table table-striped"
          style={{
            fontSize: "large",
            // position: "absolute",
            // top: "10%",
            // left: "69%",
            // width: "31%",
          }}
        >
          <thead>
            <tr>
              <th scope="col" className="menu-column">
                메뉴
              </th>
              <th scope="col" className="quantity-column">
                수량
              </th>
              <th scope="col" className="price-column">
                가격
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-danger me-2"
                      type="button"
                      onClick={() => handleDelete(order.id)}
                    >
                      삭제
                    </button>
                    <span>{order.name}</span>
                  </div>
                </td>
                <td>
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => reduce(order)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      value={order.count}
                      style={{ maxWidth: "50%" }}
                      disabled
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => add(order)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{order.price * order.count}￦</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            textAlign: "right",
            position: "absolute",
            bottom: 10,
            right: 10,
            left: 10,
          }}
        >
          <ul
            className="list-group list-group-flush"
            style={{ fontSize: "x-large" }}
          >
            <li className="list-group-item d-flex justify-content-between">
              주문 수량 <span>{getOrderCount()} 잔</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              총 가격 <span>{totalPrice} 원</span>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-warning"
            style={{
              // position: "absolute",
              // left: "68.5%",
              // top: "84%",
              // width: "20.5%",
              // height: "15%",
              fontSize: "xx-large",
            }}
            onClick={handleConfirm}
          >
            주문 확정
          </button>
          <button
            type="button"
            className="btn btn-outline-success"
            style={{
              // position: "absolute",
              // left: "89%",
              // top: "84%",
              // width: "10.5%",
              // height: "15%",
              fontSize: "xx-large",
            }}
            onClick={handleClear}
          >
            주문 취소
          </button>
        </div>
      </div>
      <AddModal
        data={currentOrder}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default YoungerOrder;
