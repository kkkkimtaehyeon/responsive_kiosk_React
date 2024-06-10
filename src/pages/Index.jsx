import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Index() {


    return (
        <Container>
            <Link to="https://responsivekiosk.store/manage" className="btn btn-lg btn-primary">관리</Link>
            <Link to="main" className="btn btn-lg btn-primary">시작</Link>

        </Container>

    );
}