import {Button, Card, CardBody, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const Payment = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isPaid, setIsPaid] = useState(false);
    const tempPort = process.env.REACT_APP_SERVER_PORT;
    const [orderData, setOrderData] = useState();

    const pay = () => {
        setIsPaid(true);
    }



    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sendOrderToServer = ((data) => {
        axios.post(`https://${tempPort}/api/orders`, data)
            .then(response => {
                const orderId = response.data;
                console.log("order success", orderId);
                navigate("/order-complete", {state: orderId});
            })
            .catch(error => {
                console.log("order failed", error);
            });
    });

    useEffect(() => {
        console.log('oderData is ', state.orderData);
        if(typeof state.orderData === "string") {
            setOrderData(JSON.parse(state.orderData));
        }else if(typeof state.orderData === "object") {
            setOrderData(state.orderData);
        }

        console.log(orderData);
        if(isPaid) {
            sendOrderToServer(orderData);
        }
    }, [isPaid, state.orderData, sendOrderToServer, orderData]);

    return (
        <Container>
            <Card className="border-0">
                <CardBody className="bg-light">
                    <Row className="justify-content-center">
                        <h1>결제를 진행해주세요.</h1>
                    </Row>
                    <Row>
                        <span>결제 금액 <strong>{state.orderData.totalPrice}</strong></span>
                    </Row>
                    <Row className="mt-3 justify-content-center">
                        <Button className="btn btn-primary" onClick={pay}>결제</Button>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Payment;
