import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

const OrderComplete = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/main");
        }, 10000)
    }, [navigate]);

    return (
        <Container>
            <div>
                주문완료! 주문번호는 <strong>{state}</strong>입니다!
            </div>
        </Container>
    );
}

export default OrderComplete;
